import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Loader2 } from "lucide-react";

type LoginFormProps = {
  onSubmit: (password: string) => Promise<void>;
  error?: string;
  isLoading: boolean;
};

export function LoginForm({ onSubmit, error, isLoading }: LoginFormProps) {
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit(password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          placeholder="Enter password"
          disabled={isLoading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        Sign In
      </Button>
    </form>
  );
}
