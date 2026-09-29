import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { LockKeyhole, LogOut, RefreshCw, Users, Landmark } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

const fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleString("en-AU", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return iso;
  }
};

const STATUS_OPTIONS = ["new", "contacted", "quoted", "won", "lost"];
const STATUS_STYLES = {
  new: "bg-[#D97706]/10 text-[#B45309] border-[#D97706]/30",
  contacted: "bg-[#0369A1]/10 text-[#0369A1] border-[#0369A1]/30",
  quoted: "bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/30",
  won: "bg-[#166534]/10 text-[#166534] border-[#166534]/30",
  lost: "bg-[#A8A29E]/15 text-[#57534E] border-[#A8A29E]/40",
};

function StatusSelect({ value, onChange, testId }) {
  const status = value || "new";
  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value)}
      data-testid={testId}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize cursor-pointer focus:outline-none ${STATUS_STYLES[status] || STATUS_STYLES.new}`}
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}

function KeyGate({ onUnlock }) {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!key.trim()) return;
    setLoading(true);
    try {
      await api.get("/leads", { headers: { "X-Admin-Key": key.trim() } });
      sessionStorage.setItem("sunmac_admin_key", key.trim());
      onUnlock(key.trim());
    } catch {
      toast.error("Invalid admin key");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-white border border-[#E7E5E4] rounded-2xl p-8" data-testid="admin-key-gate">
        <div className="w-12 h-12 rounded-xl bg-[#D97706]/10 text-[#D97706] flex items-center justify-center">
          <LockKeyhole className="w-6 h-6" />
        </div>
        <h1 className="font-display text-2xl font-medium mt-5">Admin access</h1>
        <p className="text-sm text-[#57534E] mt-2">Enter your admin key to view captured leads.</p>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Admin key"
          data-testid="admin-key-input"
          className="mt-5 w-full rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] px-4 py-3 text-sm focus:outline-none focus:border-[#D97706]"
        />
        <button
          type="submit"
          disabled={loading}
          data-testid="admin-key-submit"
          className="mt-4 w-full rounded-full bg-[#D97706] hover:bg-[#B45309] disabled:opacity-60 text-[#FDFBF7] py-3 text-sm font-medium transition-colors"
        >
          {loading ? "Checking..." : "Unlock dashboard"}
        </button>
        <Link to="/" className="block text-center text-xs text-[#A8A29E] hover:text-[#D97706] mt-5" data-testid="admin-back-home">
          ← Back to sunmacsolar.com.au
        </Link>
      </form>
    </div>
  );
}

function LeadsTable({ rows, onStatusChange }) {
  if (!rows.length) return <p className="text-sm text-[#57534E] py-10 text-center" data-testid="admin-leads-empty">No contact leads yet.</p>;
  return (
    <div className="overflow-x-auto" data-testid="admin-leads-table">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wider text-[#A8A29E] border-b border-[#E7E5E4]">
            <th className="py-3 pr-4">Status</th>
            <th className="py-3 pr-4">Received</th>
            <th className="py-3 pr-4">Name</th>
            <th className="py-3 pr-4">Email</th>
            <th className="py-3 pr-4">Phone</th>
            <th className="py-3 pr-4">Location</th>
            <th className="py-3 pr-4">Service</th>
            <th className="py-3">Message</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((l) => (
            <tr key={l.id} className="border-b border-[#F5F5F0] align-top" data-testid={`admin-lead-row-${l.id}`}>
              <td className="py-3 pr-4">
                <StatusSelect value={l.status} onChange={(s) => onStatusChange(l.id, s)} testId={`lead-status-${l.id}`} />
              </td>
              <td className="py-3 pr-4 whitespace-nowrap text-[#57534E]">{fmtDate(l.created_at)}</td>
              <td className="py-3 pr-4 font-medium">{l.name}</td>
              <td className="py-3 pr-4"><a href={`mailto:${l.email}`} className="text-[#D97706] hover:underline">{l.email}</a></td>
              <td className="py-3 pr-4 whitespace-nowrap">{l.phone}</td>
              <td className="py-3 pr-4">{l.location || "-"}</td>
              <td className="py-3 pr-4 capitalize">{l.service_type || "-"}</td>
              <td className="py-3 max-w-xs text-[#57534E]">{l.message || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PPATable({ rows, onStatusChange }) {
  if (!rows.length) return <p className="text-sm text-[#57534E] py-10 text-center" data-testid="admin-ppa-empty">No PPA inquiries yet.</p>;
  return (
    <div className="overflow-x-auto" data-testid="admin-ppa-table">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wider text-[#A8A29E] border-b border-[#E7E5E4]">
            <th className="py-3 pr-4">Status</th>
            <th className="py-3 pr-4">Received</th>
            <th className="py-3 pr-4">Name</th>
            <th className="py-3 pr-4">Email</th>
            <th className="py-3 pr-4">Phone</th>
            <th className="py-3 pr-4">Land location</th>
            <th className="py-3 pr-4">Acres</th>
            <th className="py-3 pr-4">Grid</th>
            <th className="py-3">Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.id} className="border-b border-[#F5F5F0] align-top" data-testid={`admin-ppa-row-${p.id}`}>
              <td className="py-3 pr-4">
                <StatusSelect value={p.status} onChange={(s) => onStatusChange(p.id, s)} testId={`ppa-status-${p.id}`} />
              </td>
              <td className="py-3 pr-4 whitespace-nowrap text-[#57534E]">{fmtDate(p.created_at)}</td>
              <td className="py-3 pr-4 font-medium">{p.name}</td>
              <td className="py-3 pr-4"><a href={`mailto:${p.email}`} className="text-[#D97706] hover:underline">{p.email}</a></td>
              <td className="py-3 pr-4 whitespace-nowrap">{p.phone}</td>
              <td className="py-3 pr-4">{p.land_location}</td>
              <td className="py-3 pr-4">{p.land_size_acres ?? "-"}</td>
              <td className="py-3 pr-4">{p.has_grid_connection ? "Yes" : "No"}</td>
              <td className="py-3 max-w-xs text-[#57534E]">{p.notes || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminLeads() {
  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem("sunmac_admin_key") || "");
  const [tab, setTab] = useState("leads");
  const [leads, setLeads] = useState([]);
  const [ppa, setPpa] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (key) => {
    setLoading(true);
    try {
      const headers = { "X-Admin-Key": key };
      const [l, p] = await Promise.all([
        api.get("/leads", { headers }),
        api.get("/ppa-inquiries", { headers }),
      ]);
      setLeads(l.data);
      setPpa(p.data);
    } catch (err) {
      if (err?.response?.status === 401) {
        sessionStorage.removeItem("sunmac_admin_key");
        setAdminKey("");
        toast.error("Session expired — enter your admin key again");
      } else {
        toast.error("Failed to load leads");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (adminKey) load(adminKey);
  }, [adminKey, load]);

  const changeStatus = async (kind, id, status) => {
    const setter = kind === "leads" ? setLeads : setPpa;
    try {
      await api.patch(`/${kind === "leads" ? "leads" : "ppa-inquiries"}/${id}/status`, { status }, { headers: { "X-Admin-Key": adminKey } });
      setter((rows) => rows.map((r) => (r.id === id ? { ...r, status } : r)));
      toast.success(`Marked as ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  if (!adminKey) return <KeyGate onUnlock={setAdminKey} />;

  const logout = () => {
    sessionStorage.removeItem("sunmac_admin_key");
    setAdminKey("");
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]" data-testid="admin-dashboard">
      <header className="border-b border-[#E7E5E4] bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#D97706] font-medium">SunMac Solar</div>
            <h1 className="font-display text-xl font-medium">Leads Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => load(adminKey)} disabled={loading} data-testid="admin-refresh-btn"
              className="inline-flex items-center gap-2 rounded-full border border-[#E7E5E4] hover:border-[#D97706] px-4 py-2 text-xs font-medium transition-colors">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
            <button onClick={logout} data-testid="admin-logout-btn"
              className="inline-flex items-center gap-2 rounded-full border border-[#E7E5E4] hover:border-[#D97706] px-4 py-2 text-xs font-medium transition-colors">
              <LogOut className="w-3.5 h-3.5" /> Lock
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab("leads")} data-testid="admin-tab-leads"
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${tab === "leads" ? "bg-[#1C1917] text-[#FDFBF7]" : "border border-[#E7E5E4] text-[#57534E] hover:border-[#D97706]"}`}>
            <Users className="w-4 h-4" /> Contact leads ({leads.length})
          </button>
          <button onClick={() => setTab("ppa")} data-testid="admin-tab-ppa"
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${tab === "ppa" ? "bg-[#1C1917] text-[#FDFBF7]" : "border border-[#E7E5E4] text-[#57534E] hover:border-[#D97706]"}`}>
            <Landmark className="w-4 h-4" /> PPA inquiries ({ppa.length})
          </button>
        </div>
        <div className="bg-white border border-[#E7E5E4] rounded-2xl p-6">
          {tab === "leads"
            ? <LeadsTable rows={leads} onStatusChange={(id, s) => changeStatus("leads", id, s)} />
            : <PPATable rows={ppa} onStatusChange={(id, s) => changeStatus("ppa", id, s)} />}
        </div>
      </main>
    </div>
  );
}
