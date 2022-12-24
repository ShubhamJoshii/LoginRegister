const cors = require("cors");
const Express  = require("express");
const mongoose = require("mongoose");
const path = require("path")
const app = Express();
const {MongoURI} = require("./config/keys")
app.use(Express.json());
app.use(Express.urlencoded());
app.use(cors({
    origin:true,
    credentials:true
}));


mongoose.connect(MongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology : true
// mongoose.connect("mongodb://localhost:27017/PracticeLogin").then(()=>{
}).then(()=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log("DataBase Not Conneted")
})

const SchemaDB = new mongoose.Schema({
    Name:String,
    Email: String,
    Password : String
})

const MondelDB= new mongoose.model("Login",SchemaDB);

if(process.env.NODE_ENV == "production"){
    app.get("/",(req,res)=>{
        console.log(MongoURI)
        app.use(Express.static(path.resolve(__dirname,"frontend/build")));
        res.status(200).sendFile(path.resolve(__dirname,"frontend/build"));
    })
}


app.post("/sendData",async (req,res)=>{
    const {Email,Password} = req.body;
    MondelDB.findOne({Email:Email},async (err,user)=>{
        if(user){
            if(user.Password === Password){
                res.status(200).send({message:"User Logined",user:user});
            }
            else{
                res.status(200).send({message:"Password is In-Correct"});
            }
        }
        else{
            res.status(200).send({message:"User Not Registerted"});
        }
    })

    // console.log(Data);
    // res.send(req.body);
})

app.post("/saveData",async (req,res)=>{
    // console.log(req.body)
    const {Name, Email, Password} = req.body;
    // console.log(Email)
    await MondelDB.findOne({Email:Email}, async (err,resData)=>{
        if(resData){
            res.status(409).send({message:"User Already Exists"})
        }
        else{
            const Data = await MondelDB.insertMany([{Name:Name,Email:Email,Password:Password}])
            res.status(200).send({message:"User Registered"})
            // console.log(Data)
        }
    })
    })    
    
const port = process.env.PORT || 8000;
// const port = 8000;
app.listen(port,()=>{
    console.log(`Connected at Port ${port}`)
})

module.exports = app;