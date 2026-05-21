import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import {
  Settings, LogOut, Eye, EyeOff, Copy, Plus, Trash2, Edit, Loader2, KeyRound, Webhook, Users as UsersIcon, Bot, ShieldAlert,
} from "lucide-react";
import delmarLogo from "@/assets/delmar-logo.png";

type Category = "admin" | "inbox" | "marketing" | "sales" | "delivery";

const CATEGORY_META: Record<Category, { label: string; emoji: string; color: string }> = {
  admin:     { label: "Admin",     emoji: "🧑‍💼", color: "#3B82F6" },
  inbox:     { label: "Inbox",     emoji: "🧑‍💻", color: "#06B6D4" },
  marketing: { label: "Marketing", emoji: "🧑‍🎨", color: "#EC4899" },
  sales:     { label: "Sales",     emoji: "🧑‍🚀", color: "#F59E0B" },
  delivery:  { label: "Delivery",  emoji: "🧑‍🔧", color: "#10B981" },
};

const AdminLayout = () => {
  const { user, signOut, isAdmin, isManagerPlus, roles } = useAuth();
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login/admin");
  };

  const initial = (user?.email ?? "?").charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header — borderless, logo left, avatar right */}
      <header className="h-20 flex items-center justify-between px-6 lg:px-10 shrink-0">
        <Link to="/admin" className="flex items-center gap-3">
          <img src={delmarLogo} alt="Delmar" className="h-14 w-14 object-contain" />
          <span className="font-bold text-lg tracking-tight hidden sm:inline">Delmar Web Studios</span>
        </Link>

        <Popover>
          <PopoverTrigger asChild>
            <button className="w-10 h-10 rounded-full bg-electric text-white font-semibold flex items-center justify-center hover:ring-4 hover:ring-electric/15 transition-all">
              {initial}
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-72 p-0 rounded-2xl border-border/60 shadow-premium">
            <div className="p-5 border-b border-border/60">
              <div className="font-semibold truncate">{user?.email}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {roles.length ? roles.join(" · ") : "—"}
              </div>
            </div>
            <div className="p-2">
              <button
                onClick={() => setSettingsOpen(true)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-secondary transition-colors"
              >
                <Settings className="h-4 w-4" /> Paramètres
              </button>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-secondary transition-colors"
              >
                <LogOut className="h-4 w-4" /> Se déconnecter
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </header>

      {/* Main canvas */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <SettingsOverlay open={settingsOpen} onOpenChange={setSettingsOpen} isAdmin={isAdmin} isManagerPlus={isManagerPlus} />
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════════════
   Settings overlay — 4 tabs
   ════════════════════════════════════════════════════════════════════════ */
const SettingsOverlay = ({
  open, onOpenChange, isAdmin, isManagerPlus,
}: { open: boolean; onOpenChange: (v: boolean) => void; isAdmin: boolean; isManagerPlus: boolean }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 rounded-3xl border-0 shadow-premium overflow-hidden">
        <Tabs defaultValue="agents" className="flex flex-col h-[80vh]">
          <div className="px-8 pt-6 pb-2">
            <h2 className="text-2xl font-bold tracking-tight">Paramètres</h2>
          </div>
          <TabsList className="mx-8 mb-2 bg-secondary/50 rounded-full p-1 self-start">
            <TabsTrigger value="agents" className="rounded-full px-4 gap-2"><Bot className="h-3.5 w-3.5" />Agents</TabsTrigger>
            <TabsTrigger value="webhook" className="rounded-full px-4 gap-2"><Webhook className="h-3.5 w-3.5" />Webhook</TabsTrigger>
            {isAdmin && <TabsTrigger value="vault" className="rounded-full px-4 gap-2"><KeyRound className="h-3.5 w-3.5" />Credentials</TabsTrigger>}
            {isManagerPlus && <TabsTrigger value="users" className="rounded-full px-4 gap-2"><UsersIcon className="h-3.5 w-3.5" />Équipe</TabsTrigger>}
          </TabsList>
          <div className="flex-1 overflow-auto px-8 py-6">
            <TabsContent value="agents"><AgentsPanel /></TabsContent>
            <TabsContent value="webhook"><WebhookPanel /></TabsContent>
            {isAdmin && <TabsContent value="vault"><VaultPanel /></TabsContent>}
            {isManagerPlus && <TabsContent value="users"><UsersPanel /></TabsContent>}
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

/* ───────────── Webhook Panel ───────────── */
const WebhookPanel = () => {
  const [url, setUrl] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("settings_vault").select("key,value").in("key", ["MAIN_WEBHOOK_URL", "MAIN_WEBHOOK_TOKEN"]);
      data?.forEach((r: any) => {
        if (r.key === "MAIN_WEBHOOK_URL") setUrl(r.value ?? "");
        if (r.key === "MAIN_WEBHOOK_TOKEN") setToken(r.value ?? "");
      });
    })();
  }, []);

  const save = async () => {
    setLoading(true);
    await supabase.from("settings_vault").delete().in("key", ["MAIN_WEBHOOK_URL", "MAIN_WEBHOOK_TOKEN"]);
    await supabase.from("settings_vault").insert([
      { key: "MAIN_WEBHOOK_URL", value: url, category: "webhook" },
      { key: "MAIN_WEBHOOK_TOKEN", value: token, category: "webhook" },
    ]);
    setLoading(false);
    toast.success("Webhook mis à jour");
  };

  return (
    <div className="space-y-5 max-w-xl">
      <p className="text-sm text-muted-foreground">Destination principale des requêtes du dashboard.</p>
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">URL n8n</Label>
        <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://n8n.example.com/webhook/..." className="rounded-xl" />
      </div>
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Token d'authentification</Label>
        <Input value={token} onChange={(e) => setToken(e.target.value)} placeholder="Bearer …" className="rounded-xl" />
      </div>
      <Button onClick={save} disabled={loading} className="rounded-full">
        {loading && <Loader2 className="h-3 w-3 animate-spin mr-2" />} Enregistrer
      </Button>
    </div>
  );
};

/* ───────────── Vault Panel ───────────── */
type Secret = { id: string; key: string; value: string | null; category: string | null };
const VaultPanel = () => {
  const [items, setItems] = useState<Secret[]>([]);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState({ key: "", value: "", category: "general" });
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("settings_vault").select("*").order("key");
    setItems((data ?? []) as Secret[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form.key) return toast.error("Clé requise");
    const { error } = await supabase.from("settings_vault").insert(form);
    if (error) return toast.error(error.message);
    setForm({ key: "", value: "", category: "general" });
    toast.success("Ajouté");
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("settings_vault").delete().eq("id", id);
    load();
  };

  const copy = async (v: string | null) => {
    if (!v) return;
    await navigator.clipboard.writeText(v);
    toast.success("Copié");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex gap-2 items-end">
        <div className="flex-1"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Clé</Label><Input value={form.key} onChange={(e) => setForm({ ...form, key: e.target.value })} className="rounded-xl" /></div>
        <div className="flex-1"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Valeur</Label><Input value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} className="rounded-xl" /></div>
        <Button onClick={save} className="rounded-full"><Plus className="h-4 w-4" /></Button>
      </div>

      {loading ? <Loader2 className="h-5 w-5 animate-spin text-electric" /> : (
        <div className="space-y-1">
          {items.map((s) => (
            <div key={s.id} className="group flex items-center gap-3 py-3 px-2 rounded-xl hover:bg-secondary/50 transition-colors">
              <KeyRound className="h-4 w-4 text-electric shrink-0" />
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => copy(s.value)}>
                <div className="font-mono text-sm font-semibold truncate">{s.key}</div>
                <div className="font-mono text-xs text-muted-foreground truncate">
                  {revealed[s.id] ? s.value : "•".repeat(Math.min(s.value?.length ?? 8, 24))}
                </div>
              </div>
              <button onClick={() => setRevealed({ ...revealed, [s.id]: !revealed[s.id] })} className="p-2 rounded-lg hover:bg-white">
                {revealed[s.id] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
              <button onClick={() => copy(s.value)} className="p-2 rounded-lg hover:bg-white"><Copy className="h-3.5 w-3.5" /></button>
              <button onClick={() => remove(s.id)} className="p-2 rounded-lg hover:bg-white"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ───────────── Agents Panel ───────────── */
type Agent = { id: string; name: string; description: string | null; category: Category; emoji: string | null; color: string | null; webhook_url: string | null; is_active: boolean };

const AgentsPanel = () => {
  const { isAdmin } = useAuth();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Agent | null>(null);
  const [creatingCat, setCreatingCat] = useState<Category | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("agents").select("*").order("created_at", { ascending: false });
    setAgents((data ?? []) as Agent[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    if (!confirm("Supprimer ?")) return;
    await supabase.from("agents").delete().eq("id", id);
    load();
  };

  const grouped = (Object.keys(CATEGORY_META) as Category[]).map((c) => ({ cat: c, list: agents.filter((a) => a.category === c) }));

  return (
    <div className="space-y-8">
      {loading ? <Loader2 className="h-5 w-5 animate-spin text-electric" /> : grouped.map(({ cat, list }) => {
        const meta = CATEGORY_META[cat];
        return (
          <div key={cat}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{meta.emoji}</span>
                <h3 className="font-bold text-base">{meta.label}</h3>
                <Badge variant="secondary" className="text-[10px]">{list.length}</Badge>
              </div>
              {isAdmin && (
                <button onClick={() => setCreatingCat(cat)} className="text-xs text-electric font-semibold hover:underline flex items-center gap-1">
                  <Plus className="h-3 w-3" /> Créer
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {list.length === 0 ? (
                <div className="text-xs text-muted-foreground italic">Aucun agent</div>
              ) : list.map((a) => (
                <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0" style={{ background: `${meta.color}15` }}>
                    {a.emoji ?? meta.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{a.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{a.description ?? "—"}</div>
                  </div>
                  {isAdmin && (
                    <>
                      <button onClick={() => setEditing(a)} className="p-2 rounded-lg hover:bg-white"><Edit className="h-3.5 w-3.5" /></button>
                      <button onClick={() => remove(a.id)} className="p-2 rounded-lg hover:bg-white"><Trash2 className="h-3.5 w-3.5" /></button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <AgentEditDialog
        agent={editing}
        defaultCategory={creatingCat}
        open={!!editing || !!creatingCat}
        onClose={() => { setEditing(null); setCreatingCat(null); load(); }}
      />
    </div>
  );
};

const AgentEditDialog = ({ agent, defaultCategory, open, onClose }: { agent: Agent | null; defaultCategory: Category | null; open: boolean; onClose: () => void }) => {
  const [form, setForm] = useState({ name: "", description: "", category: "admin" as Category, emoji: "🤖", color: "#3B82F6", webhook_url: "", is_active: true });

  useEffect(() => {
    if (agent) {
      setForm({
        name: agent.name, description: agent.description ?? "", category: agent.category,
        emoji: agent.emoji ?? CATEGORY_META[agent.category].emoji, color: agent.color ?? "#3B82F6",
        webhook_url: agent.webhook_url ?? "", is_active: agent.is_active,
      });
    } else if (defaultCategory) {
      const m = CATEGORY_META[defaultCategory];
      setForm({ name: "", description: "", category: defaultCategory, emoji: m.emoji, color: m.color, webhook_url: "", is_active: true });
    }
  }, [agent, defaultCategory]);

  const save = async () => {
    if (!form.name) return toast.error("Nom requis (ex: Manuela - Whatsapp - Marketing Agent)");
    const { error } = agent
      ? await supabase.from("agents").update(form).eq("id", agent.id)
      : await supabase.from("agents").insert(form);
    if (error) return toast.error(error.message);
    toast.success(agent ? "Modifié" : "Créé");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg rounded-3xl border-0 shadow-premium">
        <h3 className="text-lg font-bold">{agent ? "Modifier l'agent" : "Nouvel agent"}</h3>
        <div className="space-y-3">
          <div><Label className="text-xs uppercase tracking-wider text-muted-foreground">Nom complet</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Manuela - Whatsapp - Marketing Agent" className="rounded-xl" />
            <p className="text-[10px] text-muted-foreground mt-1">Format: Prénom - Rôle - Catégorie. Le prénom est masqué côté n8n.</p>
          </div>
          <div><Label className="text-xs uppercase tracking-wider text-muted-foreground">Description</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="rounded-xl" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div><Label className="text-xs uppercase tracking-wider text-muted-foreground">Emoji</Label><Input value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} className="rounded-xl" /></div>
            <div className="col-span-2"><Label className="text-xs uppercase tracking-wider text-muted-foreground">Catégorie</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as Category })}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(Object.keys(CATEGORY_META) as Category[]).map((c) => (
                    <SelectItem key={c} value={c}>{CATEGORY_META[c].emoji} {CATEGORY_META[c].label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div><Label className="text-xs uppercase tracking-wider text-muted-foreground">Webhook spécifique (optionnel)</Label>
            <Input value={form.webhook_url} onChange={(e) => setForm({ ...form, webhook_url: e.target.value })} placeholder="https://..." className="rounded-xl" />
          </div>
          <div className="flex items-center justify-between"><Label>Actif</Label><Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} /></div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose} className="rounded-full">Annuler</Button>
          <Button onClick={save} className="rounded-full">Enregistrer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

/* ───────────── Users Panel ───────────── */
type Profile = { user_id: string; email: string | null; display_name: string | null };
type Role = "super_admin" | "manager" | "employee";

const UsersPanel = () => {
  const { isAdmin } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [rolesMap, setRolesMap] = useState<Record<string, Role[]>>({});
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [p, r] = await Promise.all([
      supabase.from("profiles").select("*"),
      supabase.from("user_roles").select("user_id, role"),
    ]);
    setProfiles((p.data ?? []) as Profile[]);
    const map: Record<string, Role[]> = {};
    (r.data ?? []).forEach((row: any) => { (map[row.user_id] ??= []).push(row.role); });
    setRolesMap(map);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const setRole = async (userId: string, newRole: Role) => {
    await supabase.from("user_roles").delete().eq("user_id", userId);
    const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: newRole });
    if (error) return toast.error(error.message);
    toast.success("Rôle mis à jour");
    load();
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center gap-3 text-sm text-muted-foreground p-6 rounded-2xl bg-secondary/50">
        <ShieldAlert className="h-5 w-5" /> Réservé aux super-admins.
      </div>
    );
  }

  return (
    <div className="space-y-1 max-w-2xl">
      {loading ? <Loader2 className="h-5 w-5 animate-spin text-electric" /> : profiles.map((p) => {
        const ur = rolesMap[p.user_id] ?? [];
        const primary: Role = ur.includes("super_admin") ? "super_admin" : ur.includes("manager") ? "manager" : "employee";
        return (
          <div key={p.user_id} className="flex items-center gap-3 py-3 px-2 rounded-xl hover:bg-secondary/50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-electric/10 text-electric flex items-center justify-center font-semibold">
              {(p.display_name ?? p.email ?? "?").charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate">{p.display_name ?? p.email}</div>
              <div className="text-xs text-muted-foreground truncate">{p.email}</div>
            </div>
            <Select value={primary} onValueChange={(v) => setRole(p.user_id, v as Role)}>
              <SelectTrigger className="w-36 rounded-full h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="employee">Employé</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="super_admin">Super-admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      })}
    </div>
  );
};

export default AdminLayout;
