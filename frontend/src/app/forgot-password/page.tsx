import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-[#36413E] text-[#ECBEB4]">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-6 py-10 lg:px-10">
        <section className="w-full rounded-[2rem] border border-[#869D96]/20 bg-[#ECBEB4] p-1 shadow-2xl shadow-black/20">
          <div className="rounded-[1.7rem] bg-[#36413E] p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.35em] text-[#869D96]">Recovery</p>
            <h1 className="mt-3 text-3xl font-light tracking-[0.16em] text-[#ECBEB4]">Forgot your password?</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#869D96]">
              Enter your email address and we will send password reset instructions.
            </p>

            <form className="mt-8 space-y-5">
              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-[#869D96]">Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-[#869D96]/25 bg-white/5 px-4 py-3 text-[#ECBEB4] outline-none transition placeholder:text-[#869D96]/75 focus:border-[#ECBEB4] focus:bg-white/8"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-2xl bg-[#ECBEB4] px-4 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#36413E] transition hover:bg-[#e0a89c]"
              >
                Send reset link
              </button>
            </form>

            <Link
              href="/login"
              className="mt-6 inline-flex items-center justify-center rounded-2xl border border-[#ECBEB4] px-4 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#ECBEB4] transition hover:bg-[#ECBEB4] hover:text-[#36413E]"
            >
              Back to login
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}