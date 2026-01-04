import jwt from "jsonwebtoken"

const JWT_SECRET = "supersecretkey"

export function authRequired(req, res, next) {
  const auth = req.headers.authorization

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {
    const token = auth.split(" ")[1]
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ message: "Invalid token" })
  }
}

export function adminOnly(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" })
  }
  next()
}
