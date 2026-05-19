import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Plus, Play, Trash2, Edit, Loader2 } from "lucide-react";

type Category = "admin" | "inbox" | "marketing" | "sales" | "delivery";
type Agent = {
  id: string; name: string; description: string | null; category: Category;
  emoji: string | null; color: string | null; webhook_url: string | null; is_active: boolean;
};

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "admin", label: "🧑‍💼 Admin" },
  { value: "inbox", label: "📥 Inbox" },
  { value: "marketing", label: "📣 Marketing" },
  { value: "sales", label: "💼 Ventes" },
  { value: "delivery", label: "🚚 Livraison" },
];

const Agents = () => {
  const { isAdmin, user } = useAuth();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [running, setRunning] = useState<string | null>(null);
  const [editing, setEditing] = useState<Agent | null>(null);
  const [form, setForm] = useState({
    name: "", description: "", category: "admin" as Category,
    emoji: "🤖", color: "#0066FF", webhook_url: "", is_active: true,
  });
  const [runPayload, setRunPayload] = useState<{ agent: Agent | null; prompt: string }>({ agent: null, prompt: "" });

  useEffect(() => { document.title = "Agents · Delmar"; load(); }, []);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("agents").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setAgents((data ?? []) as Agent[]);
    setLoading(false);
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", description: "", category: "admin", emoji: "🤖", color: "#0066FF", webhook_url: "", is_active: true });
    setOpen(true);
  };

  const openEdit = (a: Agent) => {
    setEditing(a);
    setForm({
      name: a.name, description: a.description ?? "", category: a.category,
      emoji: a.emoji ?? "🤖", color: a.color ?? "#0066FF",
      webhook_url: a.webhook_url ?? "", is_active: a.is_active,
    });
    setOpen(true);
  };

  const save = async () => {
    if (!form.name) return toast.error("Nom requis");
    const payload = { ...form };
    const { error } = editing
      ? await supabase.from("agents").update(payload).eq("id", editing.id)
      : await supabase.from("agents").insert(payload);
    if (error) return toast.error(error.message);
    toast.success(editing ? "Agent mis à jour" : "Agent créé");
    setOpen(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer cet agent ?")) return;
    const { error } = await supabase.from("agents").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Supprimé");
    load();
  };

  const runAgent = async () => {
    const a = runPayload.agent;
    if (!a || !user) return;
    setRunning(a.id);
    const payload = {
      prompt: runPayload.prompt || "",
      agent: a.name || "General",
      user_email: user.email,
      timestamp: new Date().toISOString(),
    };
    // log + send
    const { error: logErr } = await supabase.from("agent_requests").insert({
      agent_id: a.id, user_id: user.id, payload, status: "sent",
    });
    if (logErr) toast.error(logErr.message);

    if (a.webhook_url) {
      try {
        await fetch(a.webhook_url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        toast.success("Requête envoyée à n8n");
      } catch {
        toast.error("Webhook injoignable (CORS ou URL invalide)");
      }
    } else {
      toast.info("Aucun webhook configuré — requête seulement loguée");
    }
    setRunning(null);
    setRunPayload({ agent: null, prompt: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agents IA</h1>
          <p className="text-muted-foreground text-sm">Lance des workflows n8n via un payload structuré.</p>
        </div>
        {isAdmin && (
          <Button onClick={openCreate}><Plus className="h-4 w-4 mr-2" />Nouvel agent</Button>
        )}
      </div>

      {loading ? (
        <Loader2 className="h-6 w-6 animate-spin text-electric" />
      ) : agents.length === 0 ? (
        <Card className="p-10 text-center text-muted-foreground">
          Aucun agent. {isAdmin && "Crée le premier !"}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((a) => (
            <Card key={a.id} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${a.color}15`, color: a.color ?? "#0066FF" }}
                  >
                    {a.emoji}
                  </div>
                  <div>
                    <div className="font-semibold leading-tight">{a.name}</div>
                    <Badge variant="secondary" className="mt-1 text-[10px] uppercase">{a.category}</Badge>
                  </div>
                </div>
                {!a.is_active && <Badge variant="outline" className="text-[10px]">Inactif</Badge>}
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[40px]">
                {a.description || "—"}
              </p>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1" onClick={() => setRunPayload({ agent: a, prompt: "" })}>
                  <Play className="h-3 w-3 mr-1" /> Lancer
                </Button>
                {isAdmin && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => openEdit(a)}><Edit className="h-3 w-3" /></Button>
                    <Button size="sm" variant="outline" onClick={() => remove(a.id)}><Trash2 className="h-3 w-3" /></Button>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Modifier l'agent" : "Nouvel agent"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-[80px_1fr] gap-3">
              <div>
                <Label>Emoji</Label>
                <Input value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} />
              </div>
              <div>
                <Label>Nom</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Catégorie</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as Category })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Couleur</Label>
                <Input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Webhook n8n</Label>
              <Input placeholder="https://..." value={form.webhook_url} onChange={(e) => setForm({ ...form, webhook_url: e.target.value })} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Actif</Label>
              <Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
            <Button onClick={save}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Run */}
      <Dialog open={!!runPayload.agent} onOpenChange={(o) => !o && setRunPayload({ agent: null, prompt: "" })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lancer · {runPayload.agent?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Label>Prompt / contexte</Label>
            <Textarea
              rows={4}
              placeholder="Décris ce que l'agent doit faire..."
              value={runPayload.prompt}
              onChange={(e) => setRunPayload({ ...runPayload, prompt: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Si aucun agent n'est sélectionné, le payload utilisera <code>General</code> ou <code>AI CEO</code>.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRunPayload({ agent: null, prompt: "" })}>Annuler</Button>
            <Button onClick={runAgent} disabled={!!running}>
              {running && <Loader2 className="h-3 w-3 mr-2 animate-spin" />} Envoyer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Agents;
