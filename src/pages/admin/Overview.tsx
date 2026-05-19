import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Bot, Clock, Calendar, CreditCard } from "lucide-react";

const Overview = () => {
  const { user, roles } = useAuth();
  const [counts, setCounts] = useState({ agents: 0, scheduled: 0, bookings: 0, payments: 0 });

  useEffect(() => {
    document.title = "Dashboard · Delmar";
    (async () => {
      const [a, s, b, p] = await Promise.all([
        supabase.from("agents").select("id", { count: "exact", head: true }),
        supabase.from("scheduled_requests").select("id", { count: "exact", head: true }),
        supabase.from("bookings").select("id", { count: "exact", head: true }),
        supabase.from("payments").select("id", { count: "exact", head: true }),
      ]);
      setCounts({
        agents: a.count ?? 0,
        scheduled: s.count ?? 0,
        bookings: b.count ?? 0,
        payments: p.count ?? 0,
      });
    })();
  }, []);

  const cards = [
    { label: "Agents IA", value: counts.agents, icon: Bot },
    { label: "Planifications", value: counts.scheduled, icon: Clock },
    { label: "Réservations", value: counts.bookings, icon: Calendar },
    { label: "Paiements", value: counts.payments, icon: CreditCard },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bonjour 👋</h1>
        <p className="text-muted-foreground mt-1">
          Connecté en tant que <span className="font-medium">{user?.email}</span> · Rôles :{" "}
          <span className="text-electric font-medium">{roles.join(", ") || "aucun"}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Card key={c.label} className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</span>
              <c.icon className="h-4 w-4 text-electric" />
            </div>
            <div className="text-3xl font-bold">{c.value}</div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="font-semibold mb-2">Démarrage rapide</h2>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Crée tes agents IA dans <span className="text-foreground font-medium">Agents IA</span>.</li>
          <li>Configure les déclenchements automatiques dans <span className="text-foreground font-medium">Planifications</span>.</li>
          <li>Stocke tes credentials dans le <span className="text-foreground font-medium">Coffre</span> (super-admin).</li>
        </ul>
      </Card>
    </div>
  );
};

export default Overview;
