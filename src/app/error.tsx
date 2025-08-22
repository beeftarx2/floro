'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error caught:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#1E293B] to-[#4C1D95] text-white p-8">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
        <p className="text-gray-300 mb-6">
          An unexpected error occurred. Please try refreshing the page.
        </p>
        <button
          onClick={reset}
          className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
