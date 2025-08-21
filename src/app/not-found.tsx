export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-300 mb-6">The page you're looking for doesn't exist.</p>
      <a
        href="/"
        className="text-indigo-400 hover:text-indigo-300 underline"
      >
        Return to Home
      </a>
    </div>
  )
}
