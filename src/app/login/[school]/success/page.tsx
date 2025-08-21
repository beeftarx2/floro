'use client'

import { useEffect, useState } from 'react'
import { use } from 'react'
import Link from 'next/link'

const formatSchoolName = (schoolId: string) => {
  if (!schoolId) return ''
  if (schoolId === 'usc') return 'University of Southern California'
  const parts = schoolId.split('-')
  return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
}

export default function LoginSuccessPage({ params }: { params: Promise<{ school: string }> }) {
  const { school } = use(params)
  const schoolName = formatSchoolName(school)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    // Get user email from URL params or localStorage if available
    const urlParams = new URLSearchParams(window.location.search)
    const email = urlParams.get('email')
    if (email) {
      setUserEmail(email)
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-8">
      <div className="w-full max-w-md text-center">
        {/* Success Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold tracking-tight mb-4 text-green-400">
          Welcome to Floro! 🎉
        </h1>
        
        <p className="text-lg text-gray-300 mb-6">
          You have successfully logged into <span className="font-semibold text-white">{schoolName}</span>.
        </p>

        {userEmail && (
          <div className="bg-gray-800 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-white mb-2">Login Details:</h3>
            <div className="text-sm text-gray-300">
              <div><span className="font-medium">Email:</span> {userEmail}</div>
              <div><span className="font-medium">University:</span> {schoolName}</div>
              <div><span className="font-medium">Status:</span> <span className="text-green-400">✓ Verified</span></div>
            </div>
          </div>
        )}

        <p className="text-gray-400 mb-6">
          Your university email has been verified and you now have access to Floro.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full rounded-md bg-indigo-600 px-4 py-3 text-center font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Continue to Floro
          </Link>
          
          <Link
            href={`/login/${school}`}
            className="block w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-3 text-center font-medium text-white shadow-sm hover:bg-gray-700"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  )
}
