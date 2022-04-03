const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const multer=require('multer');
const Auth=require("./Routes/Auth");
const User=require("./Routes/User");
const Post=require("./Routes/Product");
const dotenv=require("dotenv");
const cors=require("cors");
// const Auth = require('./Routes/Auth');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
// app.use('/images',express.static(path.join(__dirname,'/iamges')));
app.use("/images", express.static(path.join(__dirname, "/images")));

  mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
useUnifiedTopology:true,
// useCreateIndex:true,
// useFindAndModify:true,

  }).then(()=>{
      console.log("database Connected")
  }).catch(()=>{
      console.log("err")
  })

app.use('/api/auth',Auth);
app.use('/api/users',User);
app.use('/api/posts',Post);
const storage=multer.diskStorage({
    destinition:(req,file,cb)=>{
      cb(null,'images');
    },
    filename:(req,file,cb)=>{
      cb(null,req.body.name);
      // const fileName = file.originalname.toLowerCase().split(' ').join('-');
      // cb(null, fileName)
    }
})
const upload=multer({storage:storage});

app.post("/api/upload",upload.single('file'),(req,res)=>{
  res.status(200).json("file uploaded");
})

app.listen('5000',()=>{
    console.log('server running')
})