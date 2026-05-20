import { useState, useEffect } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import delmarLogo from "@/assets/delmar-logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Admin · Delmar Web Studios";
  }, []);

  if (!authLoading && user) return <Navigate to="/admin" replace />;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Connecté");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <Card className="w-full max-w-md p-10 shadow-card border-border/60">
        <Link to="/" className="flex items-center gap-3 mb-8 justify-center">
          <img src={delmarLogo} alt="Delmar Web Studios" className="h-14 w-14 object-contain" />
          <div>
            <h1 className="font-bold text-xl tracking-tight">Delmar Web Studios</h1>
            <p className="text-xs text-muted-foreground">Espace admin</p>
          </div>
        </Link>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="info@delmarwebstudios.qzz.io" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Se connecter
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Accès réservé à l'équipe Delmar Web Studios.
        </p>
      </Card>
    </div>
  );
};

export default Login;
