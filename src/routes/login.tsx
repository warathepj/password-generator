import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/ui/login-form";
import { createSession } from "../utils/session";
import { Card } from "../components/ui/card";

export function LoginPage() {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (password: string) => {
    setIsLoading(true);
    setError("");

    try {
      const validPassword = password === import.meta.env.VITE_APP_PASSWORD;
      
      if (!validPassword) {
        throw new Error("Invalid password");
      }

      createSession();
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-8 space-y-4">
        <h1 className="text-2xl font-bold text-center">Secure Login</h1>
        <LoginForm
          onSubmit={handleLogin}
          error={error}
          isLoading={isLoading}
        />
      </Card>
    </div>
  );
}