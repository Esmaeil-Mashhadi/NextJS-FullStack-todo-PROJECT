import userModel from "../../../models/User"
import { hashPassword } from "@/utils/auth"
import connectDB from "@/utils/connectDB"


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

    const hashedPassword = await hashPassword(password)

    const newUser = await userModel.create({email : email , password : hashedPassword})
    res.status(201).json({status:"successful" , messsage:"userCreated", data:newUser })
    
}

export default handler;