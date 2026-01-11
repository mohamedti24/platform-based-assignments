export default function ApplySuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          🎉 Application Submitted
        </h1>
        <p className="text-gray-600 mb-6">
          Your job application was sent successfully.
        </p>
        <a
          href="/jobs"
          className="bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          Back to Jobs
        </a>
      </div>
    </div>
  )
}
