import { Fragment, useEffect, useState, useCallback, type ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import { LockKeyhole, LogOut, RefreshCw, Users, Landmark } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

interface Lead {
  id: string | number;
  status: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  location?: string;
  service_type?: string;
  message?: string;
}

interface PPAInquiry {
  id: string | number;
  status: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  land_location: string;
  land_size_acres?: number;
  has_grid_connection: boolean;
  notes?: string;
}

const fmtDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleString("en-AU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

const STATUS_OPTIONS = ["new", "contacted", "quoted", "won", "lost"];
const STATUS_STYLES: Record<string, string> = {
  new: "bg-[#D97706]/10 text-[#B45309] border-[#D97706]/30",
  contacted: "bg-[#0369A1]/10 text-[#0369A1] border-[#0369A1]/30",
  quoted: "bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/30",
  won: "bg-[#166534]/10 text-[#166534] border-[#166534]/30",
  lost: "bg-[#A8A29E]/15 text-[#57534E] border-[#A8A29E]/40",
};

function StatusSelect({
  value,
  onChange,
  testId,
}: {
  value: string;
  onChange: (val: string) => void;
  testId: string;
}) {
  const status = value || "new";
  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value)}
      data-testid={testId}
      // 16px on phones: iOS Safari zooms the page into any form control smaller than that
      className={`shrink-0 rounded-full border px-3 py-1.5 text-base font-medium capitalize cursor-pointer focus:outline-none md:text-xs ${STATUS_STYLES[status] || STATUS_STYLES.new}`}
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}

function KeyGate({ onUnlock }: { onUnlock: (key: string) => void }) {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
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
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-white border border-[#E7E5E4] rounded-2xl p-8"
        data-testid="admin-key-gate"
      >
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
          className="mt-5 w-full rounded-xl border border-[#E7E5E4] bg-white px-4 py-3 text-base focus:outline-none focus:border-[#D97706]"
        />
        <button
          type="submit"
          disabled={loading}
          data-testid="admin-key-submit"
          className="mt-4 w-full rounded-full bg-[#D97706] hover:bg-[#B45309] disabled:opacity-60 text-[#FDFBF7] py-3 text-sm font-medium transition-colors"
        >
          {loading ? "Checking..." : "Unlock dashboard"}
        </button>
        <Link
          href="/"
          className="block text-center text-xs text-[#A8A29E] hover:text-[#D97706] mt-5"
          data-testid="admin-back-home"
        >
          ← Back to sunmacsolar.com.au
        </Link>
      </form>
    </div>
  );
}

/** Phone layout: one stacked card per record instead of a wide, sideways-scrolling table. */
function MobileRecord({
  name,
  createdAt,
  status,
  onStatusChange,
  statusTestId,
  fields,
  testId,
}: {
  name: string;
  createdAt: string;
  status: string;
  onStatusChange: (status: string) => void;
  statusTestId: string;
  fields: [label: string, value: ReactNode][];
  testId: string;
}) {
  return (
    <li className="py-4 first:pt-0 last:pb-0" data-testid={testId}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-medium text-[#1C1917]">{name}</p>
          <p className="mt-0.5 text-xs text-[#57534E]">{fmtDate(createdAt)}</p>
        </div>
        <StatusSelect value={status} onChange={onStatusChange} testId={statusTestId} />
      </div>
      <dl className="mt-3 grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-3 gap-y-1.5 text-sm">
        {fields.map(([label, value]) => (
          <Fragment key={label}>
            <dt className="text-[#A8A29E]">{label}</dt>
            <dd className="min-w-0 break-words text-[#1C1917]">{value}</dd>
          </Fragment>
        ))}
      </dl>
    </li>
  );
}

const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

function LeadsTable({
  rows,
  onStatusChange,
}: {
  rows: Lead[];
  onStatusChange: (id: string | number, status: string) => void;
}) {
  if (!rows.length) {
    return (
      <p className="text-sm text-[#57534E] py-10 text-center" data-testid="admin-leads-empty">
        No contact leads yet.
      </p>
    );
  }
  return (
    <>
    <ul className="divide-y divide-[#E7E5E4] md:hidden" data-testid="admin-leads-cards">
      {rows.map((l) => (
        <MobileRecord
          key={l.id}
          name={l.name}
          createdAt={l.created_at}
          status={l.status}
          onStatusChange={(s) => onStatusChange(l.id, s)}
          statusTestId={`lead-status-mobile-${l.id}`}
          testId={`admin-lead-card-${l.id}`}
          fields={[
            [
              "Email",
              <a key="email" href={`mailto:${l.email}`} className="break-all text-[#D97706]">
                {l.email}
              </a>,
            ],
            [
              "Phone",
              <a key="phone" href={telHref(l.phone)} className="text-[#D97706]">
                {l.phone}
              </a>,
            ],
            ["Location", l.location || "-"],
            ["Service", <span key="service" className="capitalize">{l.service_type || "-"}</span>],
            ["Message", <span key="message" className="text-[#57534E]">{l.message || "-"}</span>],
          ]}
        />
      ))}
    </ul>
    <div className="hidden overflow-x-auto md:block" data-testid="admin-leads-table">
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
            <tr
              key={l.id}
              className="border-b border-[#E7E5E4] align-top"
              data-testid={`admin-lead-row-${l.id}`}
            >
              <td className="py-3 pr-4">
                <StatusSelect
                  value={l.status}
                  onChange={(s) => onStatusChange(l.id, s)}
                  testId={`lead-status-${l.id}`}
                />
              </td>
              <td className="py-3 pr-4 whitespace-nowrap text-[#57534E]">{fmtDate(l.created_at)}</td>
              <td className="py-3 pr-4 font-medium">{l.name}</td>
              <td className="py-3 pr-4">
                <a href={`mailto:${l.email}`} className="text-[#D97706] hover:underline">
                  {l.email}
                </a>
              </td>
              <td className="py-3 pr-4 whitespace-nowrap">{l.phone}</td>
              <td className="py-3 pr-4">{l.location || "-"}</td>
              <td className="py-3 pr-4 capitalize">{l.service_type || "-"}</td>
              <td className="py-3 max-w-xs text-[#57534E]">{l.message || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

function PPATable({
  rows,
  onStatusChange,
}: {
  rows: PPAInquiry[];
  onStatusChange: (id: string | number, status: string) => void;
}) {
  if (!rows.length) {
    return (
      <p className="text-sm text-[#57534E] py-10 text-center" data-testid="admin-ppa-empty">
        No PPA inquiries yet.
      </p>
    );
  }
  return (
    <>
    <ul className="divide-y divide-[#E7E5E4] md:hidden" data-testid="admin-ppa-cards">
      {rows.map((p) => (
        <MobileRecord
          key={p.id}
          name={p.name}
          createdAt={p.created_at}
          status={p.status}
          onStatusChange={(s) => onStatusChange(p.id, s)}
          statusTestId={`ppa-status-mobile-${p.id}`}
          testId={`admin-ppa-card-${p.id}`}
          fields={[
            [
              "Email",
              <a key="email" href={`mailto:${p.email}`} className="break-all text-[#D97706]">
                {p.email}
              </a>,
            ],
            [
              "Phone",
              <a key="phone" href={telHref(p.phone)} className="text-[#D97706]">
                {p.phone}
              </a>,
            ],
            ["Land", p.land_location],
            ["Acres", p.land_size_acres ?? "-"],
            ["Grid", p.has_grid_connection ? "Yes" : "No"],
            ["Notes", <span key="notes" className="text-[#57534E]">{p.notes || "-"}</span>],
          ]}
        />
      ))}
    </ul>
    <div className="hidden overflow-x-auto md:block" data-testid="admin-ppa-table">
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
            <tr
              key={p.id}
              className="border-b border-[#E7E5E4] align-top"
              data-testid={`admin-ppa-row-${p.id}`}
            >
              <td className="py-3 pr-4">
                <StatusSelect
                  value={p.status}
                  onChange={(s) => onStatusChange(p.id, s)}
                  testId={`ppa-status-${p.id}`}
                />
              </td>
              <td className="py-3 pr-4 whitespace-nowrap text-[#57534E]">{fmtDate(p.created_at)}</td>
              <td className="py-3 pr-4 font-medium">{p.name}</td>
              <td className="py-3 pr-4">
                <a href={`mailto:${p.email}`} className="text-[#D97706] hover:underline">
                  {p.email}
                </a>
              </td>
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
    </>
  );
}

export default function AdminLeads() {
  const [adminKey, setAdminKey] = useState<string>("");
  const [tab, setTab] = useState<"leads" | "ppa">("leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [ppa, setPpa] = useState<PPAInquiry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? sessionStorage.getItem("sunmac_admin_key") : null;
    if (saved) setAdminKey(saved);
  }, []);

  const load = useCallback(async (key: string) => {
    setLoading(true);
    try {
      const headers = { "X-Admin-Key": key };
      const [l, p] = await Promise.all([
        api.get("/leads", { headers }),
        api.get("/ppa-inquiries", { headers }),
      ]);
      setLeads(l.data);
      setPpa(p.data);
    } catch (err: unknown) {
      const errorObj = err as { response?: { status?: number } };
      if (errorObj?.response?.status === 401) {
        sessionStorage.removeItem("sunmac_admin_key");
        setAdminKey("");
        toast.error("Session expired, enter your admin key again");
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

  const changeStatus = async (kind: "leads" | "ppa", id: string | number, status: string) => {
    const setter = kind === "leads" ? setLeads : setPpa;
    try {
      await api.patch(
        `/${kind === "leads" ? "leads" : "ppa-inquiries"}/${id}/status`,
        { status },
        { headers: { "X-Admin-Key": adminKey } }
      );
      setter((rows: any[]) => rows.map((r) => (r.id === id ? { ...r, status } : r)));
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
    <>
      <Head>
        <title>Leads Dashboard | SunMac Solar Admin</title>
      </Head>
      <div className="min-h-screen bg-white" data-testid="admin-dashboard">
        <header className="border-b border-[#E7E5E4] bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#D97706] font-medium">
                SunMac Solar
              </div>
              <h1 className="font-display text-xl font-medium">Leads Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => load(adminKey)}
                disabled={loading}
                data-testid="admin-refresh-btn"
                className="inline-flex items-center gap-2 rounded-full border border-[#E7E5E4] hover:border-[#D97706] px-4 py-2 text-xs font-medium transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
              </button>
              <button
                onClick={logout}
                data-testid="admin-logout-btn"
                className="inline-flex items-center gap-2 rounded-full border border-[#E7E5E4] hover:border-[#D97706] px-4 py-2 text-xs font-medium transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" /> Lock
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setTab("leads")}
              data-testid="admin-tab-leads"
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                tab === "leads"
                  ? "bg-[#1C1917] text-[#FDFBF7]"
                  : "border border-[#E7E5E4] text-[#57534E] hover:border-[#D97706]"
              }`}
            >
              <Users className="w-4 h-4" /> Contact leads ({leads.length})
            </button>
            <button
              onClick={() => setTab("ppa")}
              data-testid="admin-tab-ppa"
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                tab === "ppa"
                  ? "bg-[#1C1917] text-[#FDFBF7]"
                  : "border border-[#E7E5E4] text-[#57534E] hover:border-[#D97706]"
              }`}
            >
              <Landmark className="w-4 h-4" /> PPA inquiries ({ppa.length})
            </button>
          </div>
          <div className="bg-white border border-[#E7E5E4] rounded-2xl p-4 sm:p-6">
            {tab === "leads" ? (
              <LeadsTable
                rows={leads}
                onStatusChange={(id, s) => changeStatus("leads", id, s)}
              />
            ) : (
              <PPATable
                rows={ppa}
                onStatusChange={(id, s) => changeStatus("ppa", id, s)}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
}

