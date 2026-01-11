"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Job = {
  id: number
  title: string
  description: string
  location: string
}

type User = {
  id: number
  email: string
  role: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null

  useEffect(() => {
    const role = localStorage.getItem("role")

    if (!token || role !== "admin") {
      router.push("/login")
      return
    }

    fetch("http://localhost:5000/api/admin/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setJobs(data.jobs)
        setUsers(data.users)
      })
  }, [router, token])

  async function addJob(e: React.FormEvent) {
    e.preventDefault()

    await fetch("http://localhost:5000/api/admin/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, location }),
    })

    setTitle("")
    setDescription("")
    setLocation("")
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-green-50 p-10">
      <h1 className="text-4xl font-bold text-green-700 mb-8">
        Admin Dashboard 👑
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Jobs</p>
          <p className="text-3xl font-bold text-green-700">
            {jobs.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Users</p>
          <p className="text-3xl font-bold text-green-700">
            {users.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Opportunities</p>
          <p className="text-3xl font-bold text-green-700">
            Open
          </p>
        </div>
      </div>

      {/* ADD JOB */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-green-700">
          ➕ Add New Opportunity
        </h2>

        <form onSubmit={addJob} className="grid grid-cols-3 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Job Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />

          <input
            className="border p-2 rounded"
            placeholder="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            required
          />

          <input
            className="border p-2 rounded col-span-3"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />

          <button className="bg-green-600 text-white px-4 py-2 rounded col-span-3 hover:bg-green-700">
            Add Job
          </button>
        </form>
      </div>

      {/* JOB LIST */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-green-700">
          📋 Manage Jobs
        </h2>

        <ul className="space-y-3">
          {jobs.map(job => (
            <li
              key={job.id}
              className="border p-3 rounded flex justify-between"
            >
              <div>
                <p className="font-semibold">{job.title}</p>
                <p className="text-sm text-gray-600">
                  {job.location}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* USERS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4 text-green-700">
          👤 Users
        </h2>

        <ul className="space-y-2">
          {users.map(user => (
            <li
              key={user.id}
              className="flex justify-between border p-2 rounded"
            >
              <span>{user.email}</span>
              <span className="text-sm text-gray-500">
                {user.role}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
