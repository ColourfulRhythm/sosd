export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8">Page Not Found</p>
        <a
          href="/"
          className="bg-accent text-primary-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-light transition-all inline-block"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}

