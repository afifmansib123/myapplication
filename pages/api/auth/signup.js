import db from "@/utils/db";
import User from "@/models/User";
import bcrypt from 'bcryptjs'
import { useReducer } from "react";

async function handler (req,res) {
    if(req.method !== 'POST'){
        return;
    }

    const {name, email, password} = req.body

    if(!name ||
        !email ||
        !email.includes('@') ||
        !password || 
        password.trim().length < 3
        ){
            res.status(422).json({
                message : 'validation error'
            })
            return 
        }
    await db.connect()

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(422).json({ message: 'User exists already!' });
      await db.disconnect();
      return;
    }
    
    const newUser = new User({
        name,
        email,
        password : bcrypt.hashSync(password),
        isAdmin : false,
        isExporter : true,
    })
    const user = newUser.save()
    await db.disconnect()

    res.status(201).send({
        message: 'User Created',
        _id: user._id,
        name : user.name,
        email : user.email,
        isAdmin : user.isAdmin,
        isExporter : user.isExporter,
    })
}
export default handler