import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const { user, roles } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [pw, setPw] = useState("");

  useEffect(() => {
    document.title = "Profil · Delmar";
    if (!user) return;
    supabase.from("profiles").select("*").eq("user_id", user.id).single().then(({ data }) => {
      if (data) { setDisplayName(data.display_name ?? ""); setAvatarUrl(data.avatar_url ?? ""); }
    });
  }, [user]);

  const save = async () => {
    if (!user) return;
    setLoading(true);
    const { error } = await supabase.from("profiles").update({
      display_name: displayName, avatar_url: avatarUrl,
    }).eq("user_id", user.id);
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Profil mis à jour");
  };

  const changePassword = async () => {
    if (!pw || pw.length < 6) return toast.error("Min 6 caractères");
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Mot de passe changé");
    setPw("");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profil</h1>
        <p className="text-muted-foreground text-sm">{user?.email} · {roles.join(", ")}</p>
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="font-semibold">Informations</h2>
        <div><Label>Nom affiché</Label><Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} /></div>
        <div><Label>Avatar (URL)</Label><Input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} /></div>
        <Button onClick={save} disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}Enregistrer
        </Button>
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="font-semibold">Mot de passe</h2>
        <div><Label>Nouveau mot de passe</Label><Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} /></div>
        <Button onClick={changePassword} disabled={loading} variant="outline">Changer</Button>
      </Card>
    </div>
  );
};

export default Profile;
