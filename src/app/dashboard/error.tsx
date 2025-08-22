'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#1E293B] to-[#4C1D95] text-white p-8">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Dashboard Error</h1>
        <p className="text-gray-300 mb-6">
          Something went wrong loading your dashboard. You can try again or return to onboarding.
        </p>
        <div className="space-y-3">
          <button
            onClick={reset}
            className="block w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/welcome"
            className="block w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 transition-colors"
          >
            Return to Welcome
          </Link>
        </div>
      </div>
    </div>
  );
}
