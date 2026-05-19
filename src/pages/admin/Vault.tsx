import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Copy, Eye, EyeOff, Trash2, Loader2, KeyRound } from "lucide-react";

type Secret = { id: string; key: string; value: string | null; category: string | null; description: string | null };

const mask = (v: string | null) => (v ? "•".repeat(Math.min(v.length, 24)) : "—");

const Vault = () => {
  const [items, setItems] = useState<Secret[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState({ key: "", value: "", category: "general", description: "" });

  useEffect(() => { document.title = "Coffre · Delmar"; load(); }, []);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("settings_vault").select("*").order("category").order("key");
    if (error) toast.error(error.message);
    setItems((data ?? []) as Secret[]);
    setLoading(false);
  };

  const save = async () => {
    if (!form.key) return toast.error("Clé requise");
    const { error } = await supabase.from("settings_vault").insert(form);
    if (error) return toast.error(error.message);
    toast.success("Secret ajouté");
    setOpen(false);
    setForm({ key: "", value: "", category: "general", description: "" });
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer ce secret ?")) return;
    await supabase.from("settings_vault").delete().eq("id", id);
    load();
  };

  const copy = async (v: string | null) => {
    if (!v) return;
    await navigator.clipboard.writeText(v);
    toast.success("Copié");
  };

  const grouped = items.reduce<Record<string, Secret[]>>((acc, s) => {
    const k = s.category ?? "general";
    (acc[k] ??= []).push(s);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Coffre</h1>
          <p className="text-muted-foreground text-sm">Credentials masqués pour les intégrations.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Nouveau secret</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Nouveau secret</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Clé</Label><Input value={form.key} onChange={(e) => setForm({ ...form, key: e.target.value })} placeholder="OPENAI_API_KEY" /></div>
              <div><Label>Valeur</Label><Textarea rows={3} value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} /></div>
              <div><Label>Catégorie</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
              <div><Label>Description</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
              <Button onClick={save}>Enregistrer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4 bg-amber-50 border-amber-200 text-sm">
        ⚠️ Les valeurs sont stockées en clair dans la base (chiffrement au repos par Supabase).
        Pour les secrets critiques d'edge functions, utilise plutôt les <strong>Secrets Supabase</strong>.
      </Card>

      {loading ? (
        <Loader2 className="h-6 w-6 animate-spin text-electric" />
      ) : items.length === 0 ? (
        <Card className="p-10 text-center text-muted-foreground">Coffre vide.</Card>
      ) : (
        Object.entries(grouped).map(([cat, list]) => (
          <div key={cat} className="space-y-2">
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{cat}</h3>
            <div className="space-y-2">
              {list.map((s) => (
                <Card key={s.id} className="p-3 flex items-center gap-3">
                  <KeyRound className="h-4 w-4 text-electric shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-sm font-semibold truncate">{s.key}</div>
                    <div className="font-mono text-xs text-muted-foreground truncate">
                      {revealed[s.id] ? s.value : mask(s.value)}
                    </div>
                    {s.description && <div className="text-xs text-muted-foreground mt-0.5">{s.description}</div>}
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => setRevealed({ ...revealed, [s.id]: !revealed[s.id] })}>
                    {revealed[s.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => copy(s.value)}><Copy className="h-3 w-3" /></Button>
                  <Button size="sm" variant="ghost" onClick={() => remove(s.id)}><Trash2 className="h-3 w-3" /></Button>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Vault;
