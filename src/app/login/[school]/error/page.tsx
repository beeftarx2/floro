'use client'

import Link from 'next/link'
import { use } from 'react'

const formatSchoolName = (schoolId: string) => {
  if (schoolId === 'usc') return 'University of Southern California'
  const parts = schoolId.split('-')
  return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
}

export default function LoginErrorPage({ params }: { params: Promise<{ school: string }> }) {
  const { school } = use(params)
  const schoolName = formatSchoolName(school)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-8">
      <div className="w-full max-w-md text-center">
        {/* Error Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-6">
          <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold tracking-tight mb-4 text-red-400">
          Invalid Email Domain
        </h1>
        
        <p className="text-lg text-gray-300 mb-6">
          You attempted to login to <span className="font-semibold text-white">{schoolName}</span> with an email address that is not from an approved university domain.
        </p>

        <div className="bg-gray-800 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold text-white mb-2">Approved Email Domains:</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• UC Davis (@ucdavis.edu)</li>
            <li>• UCLA (@ucla.edu)</li>
            <li>• UC Berkeley (@berkeley.edu)</li>
            <li>• UC Irvine (@uci.edu)</li>
            <li>• UC Merced (@ucmerced.edu)</li>
            <li>• UC Riverside (@ucr.edu)</li>
            <li>• UC San Diego (@ucsd.edu)</li>
            <li>• UC Santa Barbara (@ucsb.edu)</li>
            <li>• UC Santa Cruz (@ucsc.edu)</li>
            <li>• USC (@usc.edu)</li>
          </ul>
        </div>

        <p className="text-gray-400 mb-6">
          Please use your university Google account to continue.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href={`/login/${school}`}
            className="block w-full rounded-md bg-indigo-600 px-4 py-3 text-center font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Try Again with University Email
          </Link>
          
          <Link
            href="/"
            className="block w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-3 text-center font-medium text-white shadow-sm hover:bg-gray-700"
          >
            Choose Different University
          </Link>
        </div>
      </div>
    </main>
  )
}
