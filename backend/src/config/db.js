import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';

const db = new Database('jobportal.db');

db.prepare(`CREATE TABLE IF NOT EXISTS users (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT, email TEXT UNIQUE, password TEXT, role TEXT
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS jobs (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 title TEXT, description TEXT, company TEXT
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS applications (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 userId INTEGER, jobId INTEGER
)`).run();

const admin = db.prepare("SELECT * FROM users WHERE email=?").get("admin@admin.com");
if (!admin) {
  const hash = bcrypt.hashSync("admin123", 10);
  db.prepare(
    "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)"
  ).run("Admin", "admin@admin.com", hash, "admin");
}

if (db.prepare("SELECT COUNT(*) c FROM jobs").get().c === 0) {
  db.prepare("INSERT INTO jobs (title,description,company) VALUES (?,?,?)")
    .run("Frontend Developer","React + Tailwind","Tech Corp");
  db.prepare("INSERT INTO jobs (title,description,company) VALUES (?,?,?)")
    .run("Backend Developer","Node.js REST API","Dev Solutions");
}

export default db;
