const UserModel = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const signup = async (req,res)=>{
    try {
     const {name,email,password}= req.body;
     const user = await UserModel.findOne({email});
     if(user){
        return res.status(409)
        .json({message:'User is already exist, you can login',success:false})
     }
     const userModel = new UserModel({name,email,password});
     userModel.password = await bcrypt.hash(password,10);
     console.log("print User",userModel);
     await userModel.save();
     res.status(201)
     .json({message:"Signup successfully"
        ,success:true
     })
    }
    catch(err){
        res.status(500)
        .json({
            message:"Internal Server Error"
           ,success:false
        })
    }
}


const login = async(req,res)=>{
   try{
    const {email,password} = req.body;
    const user = await UserModel.findOne({email});
    const  errorMsg = 'Authentication failed email or password is wrong';
    
    if(!user){
        return res.status(403)
        .json({message:errorMsg,success:false})
     }
     const isPassEqual = await bcrypt.compare(password,user.password);
     if(!isPassEqual){
        return res.status(403)
         .json({message:'password wrong ahe',success:false});
     }

     //jwt token banvla pay , payload ahe token cha
     const jwtToken = jwt.sign(
          {email:user.email,_id:user._id},
          process.env.JWT_SECRET,
          {expiresIn:'7d'}
     )
        
     res.status(200)
        .json({message:'login Successful',success:true
            ,//pay in response jwtToken passkelo 
            jwtToken,
            email,
            name:user.name
        })
   }
   catch(err){
     res.status(500)
     .json({message:'Internal Server Error',
        success:false
     })

   }
}



const all = async(req,res)=>{
  const users = await UserModel.find();
  res.status(200).json(users);
}
module.exports = {signup,login, all};