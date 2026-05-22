import Link from "next/link";

// Color palette:
// #36413E – Iron Grey
// #ECBEB4 – Cotton Rose
// #869D96 – Muted Teal
// #885053 – Smoky Rose
// #611C35 – Crimson Violet

export default function Login() {
	return (
		<main className="min-h-screen bg-[#36413E] text-[#ECBEB4]">
			<div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10 lg:flex-row lg:items-center lg:gap-12 lg:px-10">
				<section className="mb-10 flex-1 lg:mb-0">
					<div className="inline-flex items-center gap-3 rounded-full border border-[#869D96]/35 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#869D96]">
						Montra Secure Access
					</div>
					<h1 className="mt-8 max-w-xl text-4xl font-light tracking-[0.18em] sm:text-5xl">
						Welcome back to Montra.
					</h1>
					<p className="mt-6 max-w-lg text-sm leading-7 text-[#869D96] sm:text-base">
						Sign in to review your spending, monitor suspicious activity, and keep your financial dashboard in one place.
					</p>

					<div className="mt-10 grid gap-4 sm:grid-cols-3">
						{[
							{ label: "Secure", value: "Encrypted session" },
							{ label: "Fast", value: "One-step sign in" },
							{ label: "Smart", value: "Fraud alerts" },
						].map((item) => (
							<div key={item.label} className="rounded-3xl border border-[#869D96]/20 bg-white/5 p-4">
								<p className="text-xs uppercase tracking-[0.24em] text-[#869D96]">{item.label}</p>
								<p className="mt-2 text-sm text-[#ECBEB4]">{item.value}</p>
							</div>
						))}
					</div>
				</section>

				<section className="relative flex-1">
					<div className="absolute -left-10 top-10 hidden h-32 w-32 rounded-full bg-[#885053]/20 blur-3xl lg:block" />
					<div className="absolute right-2 top-20 hidden h-40 w-40 rounded-full bg-[#869D96]/20 blur-3xl lg:block" />

					<div className="relative overflow-hidden rounded-[2rem] border border-[#869D96]/20 bg-[#ECBEB4] p-1 shadow-2xl shadow-black/20">
						<div className="rounded-[1.7rem] bg-[#36413E] p-8 sm:p-10">
							<div className="mb-8 flex items-center justify-between">
								<div>
									<p className="text-xs uppercase tracking-[0.35em] text-[#869D96]">Sign in</p>
									<h2 className="mt-2 text-2xl font-light tracking-[0.14em] text-[#ECBEB4]">Account Login</h2>
								</div>
								<div className="rounded-full border border-[#869D96]/25 px-3 py-2 text-xs uppercase tracking-[0.2em] text-[#869D96]">
									Montra
								</div>
							</div>

							<form className="space-y-5">
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

								<label className="block">
									<span className="mb-2 block text-xs uppercase tracking-[0.22em] text-[#869D96]">Password</span>
									<input
										type="password"
										name="password"
										autoComplete="current-password"
										placeholder="Enter your password"
										className="w-full rounded-2xl border border-[#869D96]/25 bg-white/5 px-4 py-3 text-[#ECBEB4] outline-none transition placeholder:text-[#869D96]/75 focus:border-[#ECBEB4] focus:bg-white/8"
									/>
								</label>

								<div className="flex items-center justify-between gap-4 text-sm">
									<label className="flex items-center gap-2 text-[#869D96]">
										<input
											type="checkbox"
											className="h-4 w-4 rounded border-[#869D96]/40 bg-transparent text-[#885053] accent-[#885053]"
										/>
										Remember me
									</label>
									<Link href="/forgot-password" className="text-[#ECBEB4] underline decoration-[#869D96]/50 underline-offset-4 transition hover:text-white">
										Forgot password?
									</Link>
								</div>

								<button
									type="submit"
									className="w-full rounded-2xl bg-[#ECBEB4] px-4 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#36413E] transition hover:bg-[#e0a89c]"
								>
									Log in
								</button>
							</form>

							<div className="mt-8 rounded-3xl border border-[#869D96]/20 bg-white/5 p-5">
								<p className="text-sm leading-6 text-[#869D96]">
									New to Montra? Sign up below!
								</p>
								<Link
									href="/signup"
									className="mt-4 inline-flex items-center justify-center rounded-2xl border border-[#ECBEB4] px-4 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#ECBEB4] transition hover:bg-[#ECBEB4] hover:text-[#36413E]"
								>
									Sign up
								</Link>
							</div>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}

