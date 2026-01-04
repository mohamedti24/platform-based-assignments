import express from 'express';
import {auth} from '../middleware/auth.js';
import db from '../config/db.js';
const r=express.Router();

r.get('/',auth,(req,res)=>res.json(db.prepare("SELECT * FROM jobs").all()));

r.post('/:id/apply',auth,(req,res)=>{
 db.prepare("INSERT INTO applications (userId,jobId) VALUES (?,?)")
  .run(req.user.id,req.params.id);
 res.json({message:'Applied'});
});
export default r;