const express=require('express');
const cors=require('cors');
const { connect } = require('./Config/db');
const { userRoutes } = require('./Routes/user.route');
const app=express();

app.use(express.json());
app.use(cors());

app.use('/users',userRoutes)

app.get('/',async(req,res)=>{
    try{
     res.send("ok")   
    }
    catch(e){
        console.log(e)
    }
})

app.listen(8080,async()=>{
    try{
     await connect;
     console.log("App listening 8080 port")
    }
    catch(e){
        console.log(e)
    }
})