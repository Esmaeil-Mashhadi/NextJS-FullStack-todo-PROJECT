import userModel from "../../../models/User"
import { hashPassword } from "@/utils/auth"
import connectDB from "@/utils/connectDB"
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";


async function handler(req, res){ 
  if (req.method !== "POST") return;

  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }


  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({
      status: "failed",
      message: "Invalid data",
    });
  }
  
    const existingUser = await userModel.findOne({ email:email })
    if(existingUser){
        res.status(422).json({status:"failed" , message :"user Exist already"})
    }

    const secretKey =process.env.secretKey
    const hashedPassword = await hashPassword(password)
    const tokenizer = sign({email}, secretKey , {expiresIn : 24*60*60} )

    const serialization = serialize("signToken" , tokenizer , {httpOnly : true , maxAge:24*60*60 , path :"/"})

    const newUser = await userModel.create({email : email , password : hashedPassword})
    res.setHeader("set-Cookie" , serialization)
    
    res.status(201).json({status:"successful" , messsage:"userCreated", data:newUser })
    
}

export default handler;