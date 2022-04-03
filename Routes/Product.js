const router=require('express').Router();
 const Post = require('../Model/Post');
  router.post("/",async(req,res) => {
     try{  
      const post= new Post(req.body);
          const save=await post.save();      
          res.status(201).json(save);
      }catch(err){
          res.status(500).json("err");
      }
  })

  router.put('/:id',async(req, res)=>{
         try{
             const post=await Post.findByIdAndUpdate(req.params.id,{
                 $set:req.body,
             },{new:true});
             res.status(200).json(post);
         }catch(err){
             res.status(500).json(err);
         }
  })
  
  router.delete('/:id',async(req, res)=>{
    try{
        const post=await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("post deleted");
    }catch(err){
        res.status(500).json(err);
    }
})

router.get('/:id',async(req, res)=>{
    try{
        const post=await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
    

})
router.get('/',async(req, res)=>{
    try{
        const post=await Post.find();
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
})



 module.exports=router;