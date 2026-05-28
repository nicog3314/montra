"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${apiBaseUrl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.message || "Unable to create account.");
      }

      router.push("/login?signup=success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to create account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#36413E] text-[#ECBEB4]">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-6 py-10 lg:px-10">
        <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#869D96]/35 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#869D96]">
              Create your account
            </div>
            <h1 className="mt-8 max-w-xl text-4xl font-light tracking-[0.18em] sm:text-5xl">
              Start using Montra today.
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-[#869D96] sm:text-base">
              Sign up to track expenses, monitor fraud alerts, and keep your personal finance dashboard organized.
            </p>
          </section>

          <section className="rounded-[2rem] border border-[#869D96]/20 bg-[#ECBEB4] p-1 shadow-2xl shadow-black/20">
            <div className="rounded-[1.7rem] bg-[#36413E] p-8 sm:p-10">
              <div className="mb-8 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#869D96]">Sign up</p>
                  <h2 className="mt-2 text-2xl font-light tracking-[0.14em] text-[#ECBEB4]">Create Account</h2>
                </div>
                <div className="rounded-full border border-[#869D96]/25 px-3 py-2 text-xs uppercase tracking-[0.2em] text-[#869D96]">
                  Montra
                </div>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-[#869D96]">Email</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="w-full rounded-2xl border border-[#869D96]/25 bg-white/5 px-4 py-3 text-[#ECBEB4] outline-none transition placeholder:text-[#869D96]/75 focus:border-[#ECBEB4] focus:bg-white/8"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-[#869D96]">Password</span>
                  <input
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    minLength={8}
                    required
                    className="w-full rounded-2xl border border-[#869D96]/25 bg-white/5 px-4 py-3 text-[#ECBEB4] outline-none transition placeholder:text-[#869D96]/75 focus:border-[#ECBEB4] focus:bg-white/8"
                  />
                </label>

                {errorMessage ? (
                  <p className="rounded-2xl border border-[#885053]/40 bg-[#885053]/10 px-4 py-3 text-sm text-[#ECBEB4]">
                    {errorMessage}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-[#ECBEB4] px-4 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#36413E] transition hover:bg-[#e0a89c]"
                >
                  {loading ? "Signing up..." : "Sign up"}
                </button>
              </form>

              <div className="mt-8 rounded-3xl border border-[#869D96]/20 bg-white/5 p-5">
                <p className="text-sm leading-6 text-[#869D96]">Already have an account?</p>
                <Link
                  href="/login"
                  className="mt-4 inline-flex items-center justify-center rounded-2xl border border-[#ECBEB4] px-4 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#ECBEB4] transition hover:bg-[#ECBEB4] hover:text-[#36413E]"
                >
                  Back to login
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}