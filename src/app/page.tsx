'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const schools = [
  { id: 'uc-davis', name: 'UC Davis' },
  { id: 'ucla', name: 'UCLA' },
  { id: 'uc-berkeley', name: 'UC Berkeley' },
  { id: 'uc-irvine', name: 'UC Irvine' },
  { id: 'uc-merced', name: 'UC Merced' },
  { id: 'uc-riverside', name: 'UC Riverside' },
  { id: 'uc-san-diego', name: 'UC San Diego' },
  { id: 'uc-santa-barbara', name: 'UC Santa Barbara' },
  { id: 'uc-santa-cruz', name: 'UC Santa Cruz' },
  { id: 'usc', name: 'University of Southern California (USC)' },
]

export default function SchoolSelectionPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user just completed OAuth and has school info in session storage
    const loginSchool = sessionStorage.getItem('floro_login_school')
    
    if (loginSchool) {
      console.log(`🔄 Redirecting to school login page: ${loginSchool}`)
      // Clear the session storage item
      sessionStorage.removeItem('floro_login_school')
      // Redirect to the school-specific login page
      router.push(`/login/${loginSchool}`)
    }
  }, [router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-8">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome to Floro</h1>
        <p className="text-lg text-gray-300 mb-8">Please select your university to begin.</p>
        
        <div className="space-y-4">
          {schools.map((school) => (
            <Link
              key={school.id}
              href={`/login/${school.id}`}
              className="block w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-3 text-center font-medium text-white shadow-sm hover:bg-gray-700"
            >
              {school.name}
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
