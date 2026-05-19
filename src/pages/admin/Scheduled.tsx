import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Plus, Trash2, Loader2 } from "lucide-react";

type Sched = {
  id: string; name: string; agent_id: string | null; cron_expression: string;
  payload: any; is_active: boolean; last_run_at: string | null;
};
type Agent = { id: string; name: string };

const PRESETS = [
  { label: "Toutes les minutes", value: "* * * * *" },
  { label: "Toutes les heures", value: "0 * * * *" },
  { label: "Tous les jours à 9h", value: "0 9 * * *" },
  { label: "Lundi à 9h", value: "0 9 * * 1" },
];

const Scheduled = () => {
  const { isAdmin } = useAuth();
  const [items, setItems] = useState<Sched[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "", agent_id: "", cron_expression: "0 9 * * *", payload: "{}", is_active: true,
  });

  useEffect(() => {
    document.title = "Planifications · Delmar";
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    const [s, a] = await Promise.all([
      supabase.from("scheduled_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("agents").select("id,name").order("name"),
    ]);
    setItems((s.data ?? []) as Sched[]);
    setAgents((a.data ?? []) as Agent[]);
    setLoading(false);
  };

  const save = async () => {
    let parsed: any = {};
    try { parsed = JSON.parse(form.payload || "{}"); }
    catch { return toast.error("Payload JSON invalide"); }
    const { error } = await supabase.from("scheduled_requests").insert({
      name: form.name, agent_id: form.agent_id || null,
      cron_expression: form.cron_expression, payload: parsed, is_active: form.is_active,
    });
    if (error) return toast.error(error.message);
    toast.success("Planification créée");
    setOpen(false);
    setForm({ name: "", agent_id: "", cron_expression: "0 9 * * *", payload: "{}", is_active: true });
    load();
  };

  const toggle = async (s: Sched) => {
    await supabase.from("scheduled_requests").update({ is_active: !s.is_active }).eq("id", s.id);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer cette planification ?")) return;
    await supabase.from("scheduled_requests").delete().eq("id", id);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Planifications</h1>
          <p className="text-muted-foreground text-sm">
            Déclencheurs cron qui exécutent un agent à intervalle régulier.
          </p>
        </div>
        {isAdmin && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" />Nouvelle</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Nouvelle planification</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div>
                  <Label>Nom</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <Label>Agent</Label>
                  <Select value={form.agent_id} onValueChange={(v) => setForm({ ...form, agent_id: v })}>
                    <SelectTrigger><SelectValue placeholder="Choisir…" /></SelectTrigger>
                    <SelectContent>
                      {agents.map((a) => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Cron</Label>
                  <div className="flex gap-2">
                    <Input value={form.cron_expression} onChange={(e) => setForm({ ...form, cron_expression: e.target.value })} />
                    <Select onValueChange={(v) => setForm({ ...form, cron_expression: v })}>
                      <SelectTrigger className="w-44"><SelectValue placeholder="Presets" /></SelectTrigger>
                      <SelectContent>
                        {PRESETS.map((p) => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Payload (JSON)</Label>
                  <Textarea rows={4} value={form.payload} onChange={(e) => setForm({ ...form, payload: e.target.value })} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Actif</Label>
                  <Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
                <Button onClick={save}>Créer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {loading ? (
        <Loader2 className="h-6 w-6 animate-spin text-electric" />
      ) : items.length === 0 ? (
        <Card className="p-10 text-center text-muted-foreground">Aucune planification.</Card>
      ) : (
        <div className="space-y-3">
          {items.map((s) => {
            const agent = agents.find((a) => a.id === s.agent_id);
            return (
              <Card key={s.id} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-xs text-muted-foreground mt-1 flex gap-3 flex-wrap">
                    <span>Agent: <span className="text-foreground">{agent?.name ?? "—"}</span></span>
                    <code className="bg-muted px-1.5 py-0.5 rounded">{s.cron_expression}</code>
                    <span>Dernier: {s.last_run_at ? new Date(s.last_run_at).toLocaleString() : "jamais"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={s.is_active ? "default" : "outline"}>{s.is_active ? "Actif" : "Inactif"}</Badge>
                  {isAdmin && (
                    <>
                      <Switch checked={s.is_active} onCheckedChange={() => toggle(s)} />
                      <Button size="sm" variant="outline" onClick={() => remove(s.id)}><Trash2 className="h-3 w-3" /></Button>
                    </>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Card className="p-4 bg-electric/5 border-electric/20 text-sm text-muted-foreground">
        ℹ️ Les planifications sont stockées en base. L'exécution réelle nécessite l'activation de <code>pg_cron</code>
        + une edge function (à déployer côté super-admin).
      </Card>
    </div>
  );
};

export default Scheduled;
