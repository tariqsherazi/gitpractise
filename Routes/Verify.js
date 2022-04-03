const jwt =require('jsonwebtoken');
const verifyToken=(req,res,next) => {
    const header=req.headers.token;
    if(header){
        const token=header.split(" ")[1];
        jwt.verify(token,"tariqsherazi",(err,user) => {
            if(err){
                res.status(401).json("you are not match");
            }
            req.user=user;
            next();
        })

    }else{
        res.status(404).json("token not found");
        console.log("token not found")
    }
}

const isAdmin=(req,res,next) => {
   if(req.user.id === req.params.id || req.user.isAdmin){

    // if (req.body.isAdmin===false) {
        return next();
    // if(req.body.isAdmin===true){
        // next();
    }else{
      return  res.status(402).json("your not admin");
    }
}


const isAdminz = (req, res, next) => {
    console.log(req.user);
    if (req.user && req.user.isAdmin) {
      return next();
    }
    return res.status(401).send({ message: 'Admin Token is not valid.' });
  };
  
module.exports={verifyToken,isAdminz};