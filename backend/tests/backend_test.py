"""SunMac Solar API backend tests - iteration 4.

Covers:
- Health + blog regression
- POST /api/leads (auto-reply + notification email side-effects)
- POST /api/ppa-inquiries (auto-reply + notification email side-effects)
- GET /api/leads and GET /api/ppa-inquiries admin auth (X-Admin-Key)
- Validation errors
"""
import os
import time
import uuid
import subprocess

import pytest
import requests

BASE_URL = os.environ['REACT_APP_BACKEND_URL'].rstrip('/')
API = f"{BASE_URL}/api"
LOG_PATH = "/var/log/supervisor/backend.err.log"
ADMIN_KEY = "sunmac-admin-2026"
SAFE_CUSTOMER_EMAIL = "delivered@resend.dev"
NOTIFICATION_EMAIL = "info@sunmacsolar.com.au"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def _tail_log(n=800):
    try:
        return subprocess.check_output(["tail", "-n", str(n), LOG_PATH], text=True, stderr=subprocess.STDOUT)
    except Exception as e:
        return f"[log-read-error: {e}]"


# ---------------- Health / regression ----------------
class TestHealthAndBlog:
    def test_health(self, client):
        r = client.get(f"{API}/health", timeout=15)
        assert r.status_code == 200
        assert r.json() == {"status": "ok"}

    def test_blog_list(self, client):
        r = client.get(f"{API}/blog", timeout=15)
        assert r.status_code == 200
        posts = r.json()
        assert isinstance(posts, list) and len(posts) >= 3
        slugs = {p["slug"] for p in posts}
        assert "off-grid-solar-systems-outback-australia" in slugs


# ---------------- Admin auth ----------------
class TestAdminAuth:
    def test_get_leads_no_key_401(self, client):
        r = client.get(f"{API}/leads", timeout=15)
        assert r.status_code == 401

    def test_get_leads_wrong_key_401(self, client):
        r = client.get(f"{API}/leads", headers={"X-Admin-Key": "wrong-key"}, timeout=15)
        assert r.status_code == 401

    def test_get_leads_correct_key_200(self, client):
        r = client.get(f"{API}/leads", headers={"X-Admin-Key": ADMIN_KEY}, timeout=15)
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_get_ppa_no_key_401(self, client):
        r = client.get(f"{API}/ppa-inquiries", timeout=15)
        assert r.status_code == 401

    def test_get_ppa_wrong_key_401(self, client):
        r = client.get(f"{API}/ppa-inquiries", headers={"X-Admin-Key": "wrong"}, timeout=15)
        assert r.status_code == 401

    def test_get_ppa_correct_key_200(self, client):
        r = client.get(f"{API}/ppa-inquiries", headers={"X-Admin-Key": ADMIN_KEY}, timeout=15)
        assert r.status_code == 200
        assert isinstance(r.json(), list)


# ---------------- Leads + Email ----------------
class TestLeadsAndEmail:
    def test_create_lead_and_two_emails(self, client):
        marker = f"TEST_{uuid.uuid4().hex[:8]}"
        payload = {
            "name": f"TEST Lead {marker}",
            "email": SAFE_CUSTOMER_EMAIL,
            "phone": "+61 400 000 000",
            "location": "Camellia NSW",
            "service_type": "commercial",
            "message": f"Automated backend test {marker}",
        }
        r = client.post(f"{API}/leads", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == SAFE_CUSTOMER_EMAIL
        assert data["service_type"] == "commercial"
        assert "id" in data and len(data["id"]) > 0

        # persistence via admin GET
        r2 = client.get(f"{API}/leads", headers={"X-Admin-Key": ADMIN_KEY}, timeout=15)
        assert r2.status_code == 200
        found = [l for l in r2.json() if l["id"] == data["id"]]
        assert len(found) == 1

        # Two background emails fire-and-forget
        time.sleep(5)
        log = _tail_log(1000)
        assert f"Email sent to {NOTIFICATION_EMAIL}" in log, (
            "Missing notification email log line. Recent:\n" + log[-2000:]
        )
        assert f"Email sent to {SAFE_CUSTOMER_EMAIL}" in log, (
            "Missing auto-reply email log line. Recent:\n" + log[-2000:]
        )

    def test_create_ppa_and_two_emails(self, client):
        marker = f"TEST_{uuid.uuid4().hex[:8]}"
        payload = {
            "name": f"TEST PPA {marker}",
            "email": SAFE_CUSTOMER_EMAIL,
            "phone": "+61 411 111 111",
            "land_size_acres": 45.5,
            "land_location": "Dubbo NSW",
            "has_grid_connection": True,
            "notes": f"Automated PPA test {marker}",
        }
        r = client.post(f"{API}/ppa-inquiries", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["land_size_acres"] == 45.5
        assert data["land_location"] == "Dubbo NSW"
        assert data["has_grid_connection"] is True

        # persistence via admin GET
        r2 = client.get(f"{API}/ppa-inquiries", headers={"X-Admin-Key": ADMIN_KEY}, timeout=15)
        assert r2.status_code == 200
        found = [i for i in r2.json() if i["id"] == data["id"]]
        assert len(found) == 1

        time.sleep(5)
        log = _tail_log(1200)
        # Both emails should have been sent (notification + auto-reply)
        assert f"Email sent to {NOTIFICATION_EMAIL}" in log
        assert f"Email sent to {SAFE_CUSTOMER_EMAIL}" in log

    def test_lead_validation_bad_email(self, client):
        r = client.post(f"{API}/leads", json={
            "name": "TEST Bad", "email": "not-an-email", "phone": "+61 400 000 000",
        }, timeout=15)
        assert r.status_code == 422

    def test_ppa_missing_required_land_location(self, client):
        r = client.post(f"{API}/ppa-inquiries", json={
            "name": "TEST Missing", "email": "test@example.com", "phone": "+61 400 000 000",
        }, timeout=15)
        assert r.status_code == 422
