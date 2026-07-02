"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { OnyuLogo } from "@/components/OnyuLogo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-4">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <OnyuLogo size={48} className="mx-auto" />
          <h1 className="font-display mt-5 text-[24px] text-ink">Admin Login</h1>
          <p className="mt-2 text-[14px] text-ink-soft">
            Sign in to manage your content
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-md border border-line bg-paper px-4 py-2.5 text-[14px] text-ink outline-none focus:border-brass focus:ring-1 focus:ring-brass"
              placeholder="admin@onyu.co"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-md border border-line bg-paper px-4 py-2.5 text-[14px] text-ink outline-none focus:border-brass focus:ring-1 focus:ring-brass"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-[13px] text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-brass px-4 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:bg-brass-deep hover:text-ivory disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
