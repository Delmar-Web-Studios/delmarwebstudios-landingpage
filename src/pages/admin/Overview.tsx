import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowUp, Loader2, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";

type Category = "admin" | "inbox" | "marketing" | "sales" | "delivery";
type Agent = { id: string; name: string; category: Category; emoji: string | null; color: string | null; webhook_url: string | null; is_active: boolean };

const CAT: Record<Category, { label: string; emoji: string; color: string }> = {
  admin:     { label: "Admin",     emoji: "🧑‍💼", color: "#3B82F6" },
  inbox:     { label: "Inbox",     emoji: "🧑‍💻", color: "#06B6D4" },
  marketing: { label: "Marketing", emoji: "🧑‍🎨", color: "#EC4899" },
  sales:     { label: "Sales",     emoji: "🧑‍🚀", color: "#F59E0B" },
  delivery:  { label: "Delivery",  emoji: "🧑‍🔧", color: "#10B981" },
};

// Strip personal first name: "Manuela - Whatsapp - Marketing Agent" → "Whatsapp - Marketing Agent"
const stripSurname = (name: string): string => {
  const parts = name.split(" - ").map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 2) return parts.slice(1).join(" - ");
  return name;
};

const Overview = () => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selected, setSelected] = useState<Agent | null>(null);
  const [sending, setSending] = useState(false);
  const [agentMenu, setAgentMenu] = useState(false);

  useEffect(() => {
    document.title = "Delmar · Dashboard";
    (async () => {
      const { data } = await supabase.from("agents").select("*").eq("is_active", true).order("category");
      setAgents((data ?? []) as Agent[]);
    })();
  }, []);

  const firstName = useMemo(() => {
    const em = user?.email ?? "";
    const local = em.split("@")[0] ?? "";
    return local.charAt(0).toUpperCase() + local.slice(1);
  }, [user]);

  const grouped = useMemo(() => {
    return (Object.keys(CAT) as Category[]).map((c) => ({ cat: c, list: agents.filter((a) => a.category === c) }));
  }, [agents]);

  const send = async () => {
    if (!prompt.trim() || !user) return;
    setSending(true);

    const agentName = selected ? stripSurname(selected.name) : "General or AI CEO Agent";
    const payload = {
      user_message: prompt,
      agent: agentName,
      timestamp: new Date().toISOString(),
      authenticated_user: user.email,
    };

    // Resolve webhook: agent-specific else main
    let webhookUrl = selected?.webhook_url ?? "";
    let token = "";
    if (!webhookUrl) {
      const { data } = await supabase.from("settings_vault").select("key, value").in("key", ["MAIN_WEBHOOK_URL", "MAIN_WEBHOOK_TOKEN"]);
      data?.forEach((r: any) => {
        if (r.key === "MAIN_WEBHOOK_URL") webhookUrl = r.value ?? "";
        if (r.key === "MAIN_WEBHOOK_TOKEN") token = r.value ?? "";
      });
    }

    await supabase.from("agent_requests").insert({
      agent_id: selected?.id ?? null, user_id: user.id, payload, status: webhookUrl ? "sent" : "logged",
    });

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...(token ? { Authorization: token } : {}) },
          body: JSON.stringify(payload),
        });
        toast.success("Envoyé");
      } catch {
        toast.error("Webhook injoignable");
      }
    } else {
      toast.info("Aucun webhook configuré — requête loguée");
    }

    setPrompt("");
    setSending(false);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 pb-24">
      <div className="w-full max-w-2xl text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-2">
          Hi {firstName},
        </h1>
        <p className="text-3xl md:text-4xl font-medium text-muted-foreground">
          Where should we start?
        </p>
      </div>

      {/* Gemini-style pill input */}
      <div className="w-full max-w-2xl">
        <div className="relative rounded-[28px] bg-white shadow-premium ring-1 ring-border/50 hover:ring-border transition-all px-2 py-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Ask Delmar AI…"
            rows={1}
            className="w-full resize-none bg-transparent border-0 outline-none px-4 py-3 text-base placeholder:text-muted-foreground/70 min-h-[52px] max-h-40"
          />

          <div className="flex items-center justify-between px-2 pb-1">
            {/* Agents dropdown */}
            <Popover open={agentMenu} onOpenChange={setAgentMenu}>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-secondary transition-colors">
                  <Sparkles className="h-4 w-4 text-electric" />
                  {selected ? (
                    <>
                      <span>{selected.emoji ?? CAT[selected.category].emoji}</span>
                      <span className="max-w-[180px] truncate">{stripSurname(selected.name)}</span>
                    </>
                  ) : (
                    <span>Agents</span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-80 p-2 rounded-2xl border-border/60 shadow-premium max-h-[420px] overflow-auto">
                <button
                  onClick={() => { setSelected(null); setAgentMenu(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary text-left"
                >
                  <span className="w-8 h-8 rounded-lg bg-electric/10 flex items-center justify-center text-base">✨</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">Default</div>
                    <div className="text-xs text-muted-foreground">General or AI CEO</div>
                  </div>
                  {!selected && <Check className="h-4 w-4 text-electric" />}
                </button>

                {grouped.map(({ cat, list }) => list.length > 0 && (
                  <div key={cat} className="mt-2">
                    <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{CAT[cat].emoji} {CAT[cat].label}</div>
                    {list.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => { setSelected(a); setAgentMenu(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary text-left"
                      >
                        <span className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: `${CAT[cat].color}15` }}>
                          {a.emoji ?? CAT[cat].emoji}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate">{stripSurname(a.name)}</div>
                        </div>
                        {selected?.id === a.id && <Check className="h-4 w-4 text-electric" />}
                      </button>
                    ))}
                  </div>
                ))}
                {agents.length === 0 && (
                  <div className="px-3 py-6 text-center text-xs text-muted-foreground">Aucun agent. Crée-en depuis Paramètres → Agents.</div>
                )}
              </PopoverContent>
            </Popover>

            <button
              onClick={send}
              disabled={!prompt.trim() || sending}
              className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 transition-all"
            >
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
