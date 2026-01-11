import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
const r=express.Router();

r.post('/register',async(req,res)=>{
 const {name,email,password}=req.body;
 const hash=await bcrypt.hash(password,10);
 try{
  db.prepare(
   "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)"
  ).run(name,email,hash,'member');
  res.json({message:'Registered'});
 }catch{res.status(400).json({message:'Email exists'});}
});

r.post('/login',async(req,res)=>{
 const user=db.prepare("SELECT * FROM users WHERE email=?").get(req.body.email);
 if(!user) return res.status(401).json({message:'Invalid'});
 const ok=await bcrypt.compare(req.body.password,user.password);
 if(!ok) return res.status(401).json({message:'Invalid'});
 const token=jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1d'});
 res.json({token,role:user.role});
});

export default r;