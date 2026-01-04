import express from 'express';
import {auth} from '../middleware/auth.js';
import {isAdmin} from '../middleware/role.js';
import db from '../config/db.js';
const r=express.Router();

r.post('/jobs',auth,isAdmin,(req,res)=>{
 const {title,description,company}=req.body;
 db.prepare("INSERT INTO jobs (title,description,company) VALUES (?,?,?)")
  .run(title,description,company);
 res.json({message:'Job added'});
});

r.get('/stats',auth,isAdmin,(req,res)=>{
 res.json({
  users: db.prepare("SELECT COUNT(*) c FROM users").get().c,
  jobs: db.prepare("SELECT COUNT(*) c FROM jobs").get().c,
  applications: db.prepare("SELECT COUNT(*) c FROM applications").get().c
 });
});
export default r;