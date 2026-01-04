export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* HERO */}
      <section className="bg-green-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Find Your Dream Job 🌱
          </h1>
          <p className="text-xl mb-8">
            Explore thousands of opportunities from top companies
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/jobs"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold"
            >
              Browse Jobs
            </a>
            <a
              href="/login"
              className="border border-white px-6 py-3 rounded-lg"
            >
              Login
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {[
            "Verified Companies",
            "Remote & Local Jobs",
            "Fast Application Process",
          ].map((f) => (
            <div
              key={f}
              className="bg-white p-6 rounded-xl shadow text-center"
            >
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                {f}
              </h3>
              <p className="text-gray-600">
                Professional opportunities tailored for you.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
