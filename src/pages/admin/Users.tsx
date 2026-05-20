import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, UserPlus } from "lucide-react";

type Profile = { user_id: string; email: string | null; display_name: string | null; created_at: string };
type Role = "super_admin" | "manager" | "employee";

const Users = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [rolesMap, setRolesMap] = useState<Record<string, Role[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => { document.title = "Équipe · Delmar"; load(); }, []);

  const load = async () => {
    setLoading(true);
    const [p, r] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("user_id, role"),
    ]);
    setProfiles((p.data ?? []) as Profile[]);
    const map: Record<string, Role[]> = {};
    (r.data ?? []).forEach((row: any) => {
      (map[row.user_id] ??= []).push(row.role);
    });
    setRolesMap(map);
    setLoading(false);
  };

  const setRole = async (userId: string, newRole: Role) => {
    // remove existing, set single
    await supabase.from("user_roles").delete().eq("user_id", userId);
    const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: newRole });
    if (error) return toast.error(error.message);
    toast.success("Rôle mis à jour");
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Équipe</h1>
          <p className="text-muted-foreground text-sm">Gère les rôles des membres connectés.</p>
        </div>
        <div className="text-xs text-muted-foreground">
          <UserPlus className="h-3 w-3 inline mr-1" />
          Les nouveaux comptes s'inscrivent via /login/admin
        </div>
      </div>

      {loading ? (
        <Loader2 className="h-6 w-6 animate-spin text-electric" />
      ) : (
        <div className="space-y-2">
          {profiles.map((p) => {
            const userRoles = rolesMap[p.user_id] ?? [];
            const primary: Role = userRoles.includes("super_admin")
              ? "super_admin" : userRoles.includes("manager") ? "manager" : "employee";
            return (
              <Card key={p.user_id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-electric/10 text-electric flex items-center justify-center font-semibold shrink-0">
                    {(p.display_name ?? p.email ?? "?").charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{p.display_name ?? "—"}</div>
                    <div className="text-xs text-muted-foreground truncate">{p.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {userRoles.map((r) => (
                    <Badge key={r} variant={r === "super_admin" ? "default" : "secondary"} className="text-[10px]">{r}</Badge>
                  ))}
                  <Select value={primary} onValueChange={(v) => setRole(p.user_id, v as Role)}>
                    <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee">Employé</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="super_admin">Super-admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Users;
