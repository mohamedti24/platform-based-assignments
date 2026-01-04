import express from "express"
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import db from "./database/db.js"

const app = express()
app.use(cors())
app.use(express.json())

const JWT_SECRET = "supersecretkey"

/* ========= MIDDLEWARE ========= */
function auth(req, res, next) {
  const header = req.headers.authorization
  if (!header) return res.status(401).json({ message: "No token" })

  const token = header.split(" ")[1]
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.status(403).json({ message: "Invalid token" })
  }
}

function adminOnly(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" })
  }
  next()
}

/* ========= LOGIN ========= */
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body
  const user = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email)

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  )

  res.json({ token, role: user.role })
})

/* ========= JOBS ========= */
app.get("/api/jobs", (req, res) => {
  const jobs = db.prepare(`
    SELECT jobs.*,
    COUNT(applications.id) AS applicants
    FROM jobs
    LEFT JOIN applications ON jobs.id = applications.job_id
    GROUP BY jobs.id
  `).all()

  res.json(jobs)
})

/* ========= APPLY ========= */
app.post("/api/jobs/:id/apply", auth, (req, res) => {
  if (req.user.role !== "member") {
    return res.status(403).json({ message: "Members only" })
  }

  try {
    db.prepare(`
      INSERT INTO applications (user_id, job_id)
      VALUES (?, ?)
    `).run(req.user.id, req.params.id)

    res.json({ message: "Applied successfully" })
  } catch {
    res.status(400).json({ message: "Already applied" })
  }
})

/* ========= ADMIN DASHBOARD ========= */
app.get("/api/admin/dashboard", auth, adminOnly, (req, res) => {
  const jobs = db.prepare(`
    SELECT jobs.*,
    COUNT(applications.id) AS applicants
    FROM jobs
    LEFT JOIN applications ON jobs.id = applications.job_id
    GROUP BY jobs.id
  `).all()

  const users = db
    .prepare("SELECT id,email,role FROM users")
    .all()

  res.json({ jobs, users })
})

/* ========= ADD JOB ========= */
app.post("/api/admin/jobs", auth, adminOnly, (req, res) => {
  const { title, description, location } = req.body
  db.prepare(`
    INSERT INTO jobs (title, description, location)
    VALUES (?, ?, ?)
  `).run(title, description, location)

  res.json({ message: "Job added" })
})

app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000")
})
