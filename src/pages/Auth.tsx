import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { API } from "@/lib/api";
import { useNavigate } from "react-router-dom";

const Auth = ({ onSuccess }: { onSuccess: () => void }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    try {
      setLoading(true);
      setError(null);
      if (mode === "signup") {
        const res = await API.auth.signup({ accountName, accountNumber, ifsc, password });
        API.token = res.token;
      } else {
        const res = await API.auth.login({ accountNumber, password });
        API.token = res.token;
      }
      onSuccess?.();
      navigate("/", { replace: true });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{mode === "login" ? "Login" : "Sign Up"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mode === "signup" && (
            <Input placeholder="Bank Account Name" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
          )}
          <Input placeholder="Bank Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
          {mode === "signup" && (
            <Input placeholder="IFSC Number" value={ifsc} onChange={(e) => setIfsc(e.target.value)} />
          )}
          <div className="flex gap-2">
            <Input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="button" variant="outline" onClick={() => setShowPassword((v) => !v)}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex gap-2">
            <Button className="flex-1" onClick={submit} disabled={loading}>
              {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
            </Button>
            <Button variant="outline" onClick={() => setMode(mode === "login" ? "signup" : "login")}>{mode === "login" ? "Sign Up" : "Have an account? Login"}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;


