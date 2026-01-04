"use client"
import { useState } from "react"

export default function CreateJob() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
  })

  const submit = async () => {
    const token = localStorage.getItem("token")

    await fetch("http://localhost:5000/api/admin/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })

    alert("Job created")
    window.location.href = "/admin"
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        Create Job
      </h1>

      {["title", "description", "location"].map((f) => (
        <input
          key={f}
          placeholder={f}
          className="block w-full mb-4 p-3 rounded border"
          onChange={(e) =>
            setForm({ ...form, [f]: e.target.value })
          }
        />
      ))}

      <button
        onClick={submit}
        className="bg-green-600 text-white px-6 py-2 rounded-lg"
      >
        Create
      </button>
    </div>
  )
}
