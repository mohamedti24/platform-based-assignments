"use client"

import { useEffect, useState } from "react"

type Job = {
  id: number
  title: string
  description: string
  location: string
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
  }, [])

  const applyJob = async (jobId: number) => {
    const token = localStorage.getItem("token")

    // 🔐 Not logged in
    if (!token) {
      window.location.href = "/login"
      return
    }

    const res = await fetch(
      `http://localhost:5000/api/jobs/${jobId}/apply`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (res.ok) {
      window.location.href = "/apply-success"
    } else {
      const data = await res.json()
      alert(data.message || "Failed to apply")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-green-600 mb-8">
        Job Opportunities
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h2 className="text-xl font-bold mb-2">
              {job.title}
            </h2>
            <p className="text-gray-600 mb-2">
              {job.description}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              📍 {job.location}
            </p>

            {/* ✅ UPDATED APPLY BUTTON */}
            <button
              onClick={() => applyJob(job.id)}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
