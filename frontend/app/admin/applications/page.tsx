"use client"
import { useEffect, useState } from "react"

export default function Applications() {
  const [apps, setApps] = useState<any[]>([])
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/applications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(setApps)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        Applications
      </h1>

      <div className="bg-white rounded-xl shadow">
        {apps.map((a) => (
          <div
            key={a.id}
            className="p-4 border-b flex justify-between"
          >
            <span>{a.email}</span>
            <span>{a.title}</span>
            <span>{a.created_at}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
