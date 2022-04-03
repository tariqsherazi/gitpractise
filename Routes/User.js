const router=require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../Model/User");
const {verifyToken,isAdminz} = require("./Verify");
router.put("/:id", async(req,res)=>{
      if(req.body.userId === req.params.id){

        if(req.body.password){
            const salt=await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hash(req.body.password,salt)
        }
        try{
    const update= await User.findByIdAndUpdate(req.params.id,{
        $set:req.body,
    },{new:true})
    res.status(200).json(update);
}catch(err) {
    console.log(err);
}
}else{
    res.status(404).json("your are not valid user");
}   
});

router.delete('/:id' ,async(req, res) => {
    if(req.body.userId===req.params.id){
        try{
            await User.findByIdAndDelete(req.params.id)
            res.json('user deleteded')

        }catch(e){
        res.status(404).send("you enter invalid user");
        }

    }else{
        res.status(500).json("your are not valid user");
    }
})




module.exports=router;