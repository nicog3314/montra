import Link from "next/link";

export default function SignupPage() {
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
              <h2 className="text-2xl font-light tracking-[0.14em] text-[#ECBEB4]">Signup Page</h2>
              <p className="mt-3 text-sm leading-6 text-[#869D96]">
                This is the destination for the signup link from the login page.
              </p>
              <div className="mt-8 space-y-4 rounded-3xl border border-[#869D96]/20 bg-white/5 p-5">
                <p className="text-sm text-[#ECBEB4]">Add your registration form here when you are ready.</p>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-2xl border border-[#ECBEB4] px-4 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#ECBEB4] transition hover:bg-[#ECBEB4] hover:text-[#36413E]"
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