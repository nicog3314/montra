'use client';

import Login from "@/app/components/Login";
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LoginBanners() {
  const params = useSearchParams();
  const verified = params.get('verified');
  const signup = params.get('signup');
  
return (
    <>
      {verified === 'true' && (
        <div className="w-full bg-[#869D96] px-6 py-3 text-center text-sm font-medium tracking-wide text-[#36413E]">
          ✓ Email verified! You can now log in.
        </div>
      )}
      {signup === 'success' && (
        <div className="w-full bg-[#869D96] px-6 py-3 text-center text-sm font-medium tracking-wide text-[#36413E]">
          ✓ Account created! Check your email to verify before logging in.
        </div>
      )}
    </>
  );
}

export default function LoginPage() {
  return (
  <>
      <Suspense>
        <LoginBanners />
      </Suspense>
      <Login />
    </>
  );
}