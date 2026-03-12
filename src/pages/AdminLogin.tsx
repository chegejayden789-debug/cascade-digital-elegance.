import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      setError("Invalid credentials. Please try again.");
      return;
    }

    navigate("/admin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-sm border border-primary/10 bg-card p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Staff <span className="text-gold-gradient">Login</span>
          </h1>
          <p className="mt-2 font-body text-sm text-muted-foreground">
            Cascade Premier Admin
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">
              Email
            </Label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 border-border bg-transparent"
              placeholder="staff@cascade.com"
            />
          </div>
          <div>
            <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">
              Password
            </Label>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 border-border bg-transparent"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="font-body text-sm text-destructive">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="bg-gold-gradient w-full font-body text-xs font-semibold uppercase tracking-widest text-primary-foreground"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="font-body text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
