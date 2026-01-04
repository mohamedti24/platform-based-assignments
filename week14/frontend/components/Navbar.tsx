'use client'
import Link from "next/link"

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  return (
    <nav className="bg-green-600 text-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          JobNet
        </Link>

        <div className="space-x-6 font-medium">
          <Link href="/jobs">Jobs</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/login">Login</Link>
          <button onClick={logout} className="hover:underline">
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
