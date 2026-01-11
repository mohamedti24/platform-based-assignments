import bcrypt from "bcryptjs"
import db from "./db.js"

async function seed() {
  const adminPass = await bcrypt.hash("admin123", 10)
  const userPass = await bcrypt.hash("user123", 10)

  // USERS
  db.prepare(`
    INSERT INTO users (email, password, role)
    VALUES 
      ('admin@jobportal.com', ?, 'admin'),
      ('user@jobportal.com', ?, 'member')
  `).run(adminPass, userPass)

  // JOBS
  const jobs = [
    ["Frontend Developer", "React, Tailwind, Next.js", "Remote"],
    ["Backend Developer", "Node.js, Express, SQLite", "Jakarta"],
    ["Full Stack Engineer", "React + Node.js", "Remote"],
    ["UI/UX Designer", "Figma, Tailwind", "Bandung"],
    ["DevOps Engineer", "Docker, CI/CD", "Singapore"],
    ["Mobile Developer", "Flutter / React Native", "Remote"],
    ["Data Analyst", "SQL, Python", "Kuala Lumpur"],
    ["Cyber Security Analyst", "Pentest, SOC", "Remote"],
  ]

  const stmt = db.prepare(`
    INSERT INTO jobs (title, description, location)
    VALUES (?, ?, ?)
  `)

  jobs.forEach(job => stmt.run(...job))

  console.log("✅ Database seeded successfully")
}

seed()
