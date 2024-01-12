import userModel from '../../models/User'
import { verifyPassword } from "@/utils/auth"
import connectDB from "@/utils/connectDB"
import { getSession } from "next-auth/react"

async function handler(req, res) { 

    try {
        await connectDB()
    } catch (error) {
        res.status(500).json({status:"failed" , message:"failed to connect to DB"})
    }

    const session = await getSession({req})

    if(!session){
        res.status(401).json({status:"failed" , message:"You are Not Logged in!"})
    }

    const user = await userModel.findOne({email : session.user.email})
    if(!user){
        res.status(404).json({status:"failed" , message:"user doesn't exist"})
    }

 if(req.method === "POST"){
        const {name , lastName , password} = req.body;

        if(!name || !lastName || !password) { 
            res.status(404).json({status:"failed" , message: "please fill all the inputes"})
        }

       const isValid = await verifyPassword(password , user.password )

    if(!isValid) {
        res.status(422).json({status:"failed" , message:"password is incorrect"})
    }

    user.name = name ;
    user.lastName = lastName;
    user.save()


    res.status(200).json({status:"success" , message:"Name and LastName Updated" , data:{name , lastName , email:session.user.email}})
}

 if (req.method === "GET") { 
  res.status(200).json({
    status:"success" , data : {name : user.name , lastName : user.lastName , email :user.email}
  })

} 

if (req.method === "PATCH"){
   const {name , lastName , password , email} = req.body.data

   
   const isValid = await verifyPassword(password , user.password )

   if(!isValid) { 
    res.status(422).json({statsu:"failed" , message:"incorrect password"})
   } 

   user.name = name ;
   user.lastName = lastName
   user.email = email

   user.save()

   res.status(200).json({status:"success" , message :"userModel Info Updated"})
   

}} 


export default handler