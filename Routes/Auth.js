const router=require('express').Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
 const User = require('../Model/User');
  router.post("/",async(req,res) => {
     try{
    
        const gen=await bcrypt.genSalt(10);
        const passHash=await bcrypt.hash(req.body.password,gen);
      const users= new User({
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password:passHash,
          isAdmin: req.body.isAdmin

      });
      
          const save=await users.save();
          const {password,...others}=users._doc
          res.status(201).json(others);

      }catch(err){
          res.status(500).json("err");
      }
  })

  router.post('/login',async(req, res)=>{
         try{
             const user=await User.findOne({username : req.body.username});
             if(!user) return res.status(401).json('you enter wrong details')
             const validate =await bcrypt.compare(req.body.password,user.password) 
             if(!validate)  return res.status(401).json('you enter wrong details');

            const token=jwt.sign({
                id:user._id, isAdmin:user.isAdmin},
                "tariqsherazi",{expiresIn:"10h"})

            //  const {password,...others}=user._doc;
              res.status(200).json({      
             token,
            name: user.username,
            _id: user.id,
            username: user.username,
            isAdmin: user.isAdmin,
            email: user.email      
            } );
         }catch(err){
             res.status(500).json(err);
         }
  })


 module.exports=router;