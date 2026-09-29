from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend email configuration
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
LEAD_RECIPIENT_EMAIL = os.environ.get('LEAD_RECIPIENT_EMAIL', 'info@sunmacsolar.com.au')
ADMIN_ACCESS_KEY = os.environ.get('ADMIN_ACCESS_KEY', '')

app = FastAPI(title="SunMac Solar API")
api_router = APIRouter(prefix="/api")


# ---------------- Models ----------------
class QuoteLead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    location: Optional[str] = None
    service_type: Optional[str] = None  # commercial, residential, irrigation, offgrid, ppa
    message: Optional[str] = None
    status: str = "new"  # new, contacted, quoted, won, lost
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class QuoteLeadCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    location: Optional[str] = None
    service_type: Optional[str] = None
    message: Optional[str] = None


class PPAInquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    land_size_acres: Optional[float] = None
    land_location: str
    has_grid_connection: Optional[bool] = None
    notes: Optional[str] = None
    status: str = "new"  # new, contacted, quoted, won, lost
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class PPAInquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    land_size_acres: Optional[float] = None
    land_location: str
    has_grid_connection: Optional[bool] = None
    notes: Optional[str] = None


class LeadStatusUpdate(BaseModel):
    status: str


ALLOWED_LEAD_STATUSES = {"new", "contacted", "quoted", "won", "lost"}


class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    title: str
    excerpt: str
    content: str
    author: str
    cover_image: str
    tags: List[str] = []
    published_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------------- Helpers ----------------
def _serialize(doc: dict) -> dict:
    if not doc:
        return doc
    for k, v in list(doc.items()):
        if isinstance(v, datetime):
            doc[k] = v.isoformat()
    return doc


def _deserialize_dates(doc: dict, fields: List[str]):
    for f in fields:
        if f in doc and isinstance(doc[f], str):
            try:
                doc[f] = datetime.fromisoformat(doc[f])
            except Exception:
                pass
    return doc


# ---------------- Email helpers ----------------
def _lead_html(title: str, rows: List[tuple], message: Optional[str] = None) -> str:
    """Build a simple HTML email body from label/value rows."""
    row_html = "".join(
        f'<tr><td style="padding:6px 12px;color:#57534E;font-weight:500;">{label}</td>'
        f'<td style="padding:6px 12px;color:#1C1917;">{value or "-"}</td></tr>'
        for label, value in rows
    )
    msg_html = (
        f'<div style="margin-top:20px;padding:16px;background:#F5F5F0;border-left:3px solid #D97706;">'
        f'<div style="font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#57534E;">Message</div>'
        f'<div style="margin-top:8px;color:#1C1917;white-space:pre-wrap;">{message}</div>'
        f'</div>'
    ) if message else ""
    return f"""
<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#1C1917;">
  <div style="background:#D97706;color:#FDFBF7;padding:16px 20px;border-radius:8px 8px 0 0;">
    <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;">SunMac Solar</div>
    <div style="font-size:22px;font-weight:600;margin-top:4px;">{title}</div>
  </div>
  <div style="border:1px solid #E7E5E4;border-top:none;border-radius:0 0 8px 8px;padding:16px 8px;">
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      {row_html}
    </table>
    {msg_html}
  </div>
  <div style="font-size:11px;color:#A8A29E;margin-top:16px;text-align:center;">
    Sent by sunmacsolar.com.au · Powered by Ecomac Energy
  </div>
</div>
""".strip()


def _auto_reply_html(first_name: str, inquiry_type: str) -> str:
    """Branded thank-you email sent to the customer after a form submission."""
    return f"""
<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#1C1917;">
  <div style="background:#D97706;color:#FDFBF7;padding:16px 20px;border-radius:8px 8px 0 0;">
    <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;">SunMac Solar</div>
    <div style="font-size:22px;font-weight:600;margin-top:4px;">Thanks for reaching out, {first_name}!</div>
  </div>
  <div style="border:1px solid #E7E5E4;border-top:none;border-radius:0 0 8px 8px;padding:24px 20px;font-size:14px;line-height:1.7;">
    <p>We've received your {inquiry_type} and one of our solar engineers will be in touch within <strong>1 business day</strong>.</p>
    <p>In the meantime, feel free to explore:</p>
    <ul style="padding-left:18px;color:#57534E;">
      <li><a href="https://www.sunmacsolar.com.au/savings" style="color:#D97706;">Solar Savings Calculator</a> — estimate your payback period</li>
      <li><a href="https://www.sunmacsolar.com.au/projects" style="color:#D97706;">Our Projects</a> — real systems delivered across Australia</li>
    </ul>
    <p>If it's urgent, call us on <strong>0493 097 601</strong>.</p>
    <p style="margin-top:20px;">Warm regards,<br/><strong>The SunMac Solar Team</strong><br/>
    <span style="color:#A8A29E;font-size:12px;">A division of Ecomac Energy Pty Ltd</span></p>
  </div>
  <div style="font-size:11px;color:#A8A29E;margin-top:16px;text-align:center;">
    sunmacsolar.com.au · 7/175-179 James Ruse Drive, Camellia NSW 2142
  </div>
</div>
""".strip()


def _send_email_sync(to: str, subject: str, html: str) -> None:
    """Generic email sender for FastAPI BackgroundTasks (runs sync fns in a threadpool).
    Never raises — logs failure only."""
    api_key = os.environ.get('RESEND_API_KEY', '').strip()
    if not api_key:
        logging.warning("RESEND_API_KEY not set — skipping email send")
        return
    try:
        resend.Emails.send({
            "from": SENDER_EMAIL,
            "to": [to],
            "subject": subject,
            "html": html,
        })
        logging.info("Email sent to %s (subject=%s)", to, subject)
    except Exception as e:
        logging.exception("Failed to send email to %s: %s", to, e)


# ---------------- Admin auth ----------------
async def require_admin(x_admin_key: str = Header(default="")):
    if not ADMIN_ACCESS_KEY or x_admin_key != ADMIN_ACCESS_KEY:
        raise HTTPException(status_code=401, detail="Invalid admin key")


# ---------------- Routes ----------------
@api_router.get("/")
async def root():
    return {"message": "SunMac Solar API is running"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


# Quote / Contact leads
@api_router.post("/leads", response_model=QuoteLead)
async def create_lead(payload: QuoteLeadCreate, background_tasks: BackgroundTasks):
    lead = QuoteLead(**payload.model_dump())
    doc = lead.model_dump()
    doc = _serialize(doc)
    await db.leads.insert_one(doc)
    # Queue email via FastAPI BackgroundTasks (framework-managed lifecycle)
    html = _lead_html(
        "New Lead — Contact Form",
        [
            ("Name", lead.name),
            ("Email", lead.email),
            ("Phone", lead.phone),
            ("Location", lead.location),
            ("Service type", lead.service_type),
            ("Received", lead.created_at.strftime("%d %b %Y · %H:%M UTC")),
        ],
        message=lead.message,
    )
    background_tasks.add_task(_send_email_sync, LEAD_RECIPIENT_EMAIL, "New Lead — Contact Form", html)
    first_name = lead.name.split()[0] if lead.name.strip() else "there"
    background_tasks.add_task(
        _send_email_sync, lead.email,
        "Thanks for contacting SunMac Solar",
        _auto_reply_html(first_name, "enquiry"),
    )
    return lead


@api_router.get("/leads", response_model=List[QuoteLead])
async def list_leads(x_admin_key: str = Header(default="")):
    await require_admin(x_admin_key)
    docs = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for d in docs:
        _deserialize_dates(d, ["created_at"])
    return docs


@api_router.patch("/leads/{lead_id}/status")
async def update_lead_status(lead_id: str, payload: LeadStatusUpdate, x_admin_key: str = Header(default="")):
    await require_admin(x_admin_key)
    if payload.status not in ALLOWED_LEAD_STATUSES:
        raise HTTPException(status_code=422, detail=f"Status must be one of {sorted(ALLOWED_LEAD_STATUSES)}")
    result = await db.leads.update_one({"id": lead_id}, {"$set": {"status": payload.status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"id": lead_id, "status": payload.status}


# PPA Inquiries
@api_router.post("/ppa-inquiries", response_model=PPAInquiry)
async def create_ppa(payload: PPAInquiryCreate, background_tasks: BackgroundTasks):
    inquiry = PPAInquiry(**payload.model_dump())
    doc = inquiry.model_dump()
    doc = _serialize(doc)
    await db.ppa_inquiries.insert_one(doc)
    html = _lead_html(
        "New Lead — PPA / Solar Farm Inquiry",
        [
            ("Name", inquiry.name),
            ("Email", inquiry.email),
            ("Phone", inquiry.phone),
            ("Land location", inquiry.land_location),
            ("Land size (acres)", inquiry.land_size_acres),
            ("Grid nearby", "Yes" if inquiry.has_grid_connection else "No"),
            ("Received", inquiry.created_at.strftime("%d %b %Y · %H:%M UTC")),
        ],
        message=inquiry.notes,
    )
    background_tasks.add_task(_send_email_sync, LEAD_RECIPIENT_EMAIL, "New Lead — PPA / Solar Farm Inquiry", html)
    first_name = inquiry.name.split()[0] if inquiry.name.strip() else "there"
    background_tasks.add_task(
        _send_email_sync, inquiry.email,
        "Thanks for your PPA inquiry — SunMac Solar",
        _auto_reply_html(first_name, "PPA / solar farm inquiry"),
    )
    return inquiry


@api_router.get("/ppa-inquiries", response_model=List[PPAInquiry])
async def list_ppa(x_admin_key: str = Header(default="")):
    await require_admin(x_admin_key)
    docs = await db.ppa_inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for d in docs:
        _deserialize_dates(d, ["created_at"])
    return docs


@api_router.patch("/ppa-inquiries/{inquiry_id}/status")
async def update_ppa_status(inquiry_id: str, payload: LeadStatusUpdate, x_admin_key: str = Header(default="")):
    await require_admin(x_admin_key)
    if payload.status not in ALLOWED_LEAD_STATUSES:
        raise HTTPException(status_code=422, detail=f"Status must be one of {sorted(ALLOWED_LEAD_STATUSES)}")
    result = await db.ppa_inquiries.update_one({"id": inquiry_id}, {"$set": {"status": payload.status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return {"id": inquiry_id, "status": payload.status}


# Blog posts
@api_router.get("/blog", response_model=List[BlogPost])
async def list_blog():
    docs = await db.blog_posts.find({}, {"_id": 0}).sort("published_at", -1).to_list(200)
    for d in docs:
        _deserialize_dates(d, ["published_at"])
    return docs


@api_router.get("/blog/{slug}", response_model=BlogPost)
async def get_blog(slug: str):
    doc = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Post not found")
    _deserialize_dates(doc, ["published_at"])
    return doc


# ---------------- Seed ----------------
SEED_POSTS = [
    {
        "slug": "why-australian-farmers-are-switching-to-solar-irrigation",
        "title": "Why Australian Farmers Are Switching to Solar Irrigation",
        "excerpt": "Diesel pumps are getting expensive. Here is how solar-powered irrigation is changing the economics of rural farms.",
        "content": "Across regional Australia, the cost of diesel and the increasing reliability of solar PV combined with lithium batteries has made solar irrigation pumping not only viable, but in many cases the most affordable option over a 20-year horizon.\n\nAt SunMac Solar we design site-specific irrigation packages — from small bore pumps to large centre-pivot systems — engineered for the harsh Australian sun. With our installation partner RB Trades Services, every system is delivered turnkey, with monitoring and 10+ year support.\n\nThis article walks through pump sizing, panel array layout, battery options and typical ROI for a 10kW irrigation install.",
        "author": "Ecomac Energy Team",
        "cover_image": "https://images.unsplash.com/photo-1717702576954-c07131c54169?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwyfHxmYXJtZXIlMjBmaWVsZCUyMHN1bnNldHxlbnwwfHx8fDE3ODE1NzU5NDV8MA&ixlib=rb-4.1.0&q=85",
        "tags": ["irrigation", "farming", "rural"],
    },
    {
        "slug": "ppa-contracts-for-australian-landowners",
        "title": "PPA Contracts Explained: Turning Vacant Land into Recurring Revenue",
        "excerpt": "Power Purchase Agreements let landowners earn long-term income without spending a cent on infrastructure.",
        "content": "A Power Purchase Agreement (PPA) is a long-term contract where SunMac Solar finances, builds, and operates a solar farm on your land. You receive a lease payment and a share of revenue across 20-30 years.\n\nWe handle planning, DA approvals, grid connection, construction and ongoing O&M — you simply collect a recurring cheque. We have ideal-fit sites ranging from 20 to 500+ acres across NSW, QLD and VIC.\n\nThis post breaks down typical $/acre returns, planning timelines, and the technical considerations that determine whether your land is a strong candidate.",
        "author": "Ecomac Energy Team",
        "cover_image": "https://images.unsplash.com/photo-1724041875334-0a6397111c7e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwc29sYXIlMjBwYW5lbHMlMjByb29mfGVufDB8fHx8MTc4MTU3NTk0NXww&ixlib=rb-4.1.0&q=85",
        "tags": ["ppa", "landowners", "commercial"],
    },
    {
        "slug": "off-grid-solar-systems-outback-australia",
        "title": "Designing Off-Grid Solar Systems for the Australian Outback",
        "excerpt": "From homestead loads to remote pump stations, off-grid design is a different beast. Here is our approach.",
        "content": "Off-grid is unforgiving. There is no utility to fall back on, no grid feed-in to soak up excess, and the cost of a callout to a remote site is significant.\n\nOur off-grid systems are designed around three principles: oversize the array, right-size the battery bank, and use a hybrid inverter platform that can integrate a backup generator cleanly.\n\nThis article shares our standard topologies for 5kW, 15kW and 50kW off-grid sites — including real components we trust on Australian farms.",
        "author": "Ecomac Energy Team",
        "cover_image": "https://images.unsplash.com/flagged/photo-1566838616631-f2618f74a6a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTZ8MHwxfHNlYXJjaHwxfHxvZmYlMjBncmlkJTIwc29sYXIlMjBob3VzZXxlbnwwfHx8fDE3ODE1NzU5NDV8MA&ixlib=rb-4.1.0&q=85",
        "tags": ["offgrid", "outback", "design"],
    },
]


@app.on_event("startup")
async def seed_blog():
    count = await db.blog_posts.count_documents({})
    if count == 0:
        for p in SEED_POSTS:
            post = BlogPost(**p)
            doc = post.model_dump()
            doc = _serialize(doc)
            await db.blog_posts.insert_one(doc)
        logging.info("Seeded %d blog posts", len(SEED_POSTS))


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
