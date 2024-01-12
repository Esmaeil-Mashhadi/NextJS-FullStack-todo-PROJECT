import connectDB from "../../utils/connectDB";
import { getSession } from "next-auth/react";
import { sortTodos } from "@/utils/sortTodos";
import userModel from "@/models/User";

async function handler(req, res) {

  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }

  const session = await getSession({req});
  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }

  const user = await userModel.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "user doesn't exsit!" });
  }

  if (req.method === "POST") {
    const { title, status } = req.body;

    if (!title || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invaild data!" });
    } 

    user.todos.push({ title, status });
    user.save();

    res.status(201).json({ status: "success", message: "Todo created!" });
  } 
   
  
  if (req.method === "GET") { 
      const sortedData = sortTodos(user.todos)
     
    res.status(200).json({status:"success" , data : sortedData })
     
   }
   
   
   if (req.method === "PATCH"){
    const {id , status , title , action} = req.body;
    if(!id , !status){
      return res.status(422).json({status:"failed" , message:"invalid data"})
    }

    if(action == "DELETE"){
      const deleteResult = await userModel.updateOne({'todos._id':id} , {$pull:{'todos' :{_id:id}}})
      if (!deleteResult.modifiedCount)  return res.status(500).json({status:500 , data:{message:"failed to delete task"}})
      return res.status(200).json({status:200 , data:{message:"task deleted successfully"}})
    }

    let result 
    if(title){
       result = await userModel.updateOne({'todos._id' : id} , {$set :{"todos.$.status" :status ,'todos.$.title' : title}})
    }else{
      result = await userModel.updateOne({"todos._id" : id}, {$set:{"todos.$.status" :status}})
    }

  

    if(result.modifiedCount == 0) return res.status(500).json({status:500 , message:"failed to updated data"})
    res.status(200).json({status:"success"})
   }
  } 

  export default handler