const cors = require("cors");
const Express  = require("express");
const mongoose = require("mongoose");
const path = require("path")
const App = Express();

App.use(Express.json());
App.use(Express.urlencoded());
App.use(cors());


mongoose.connect("mongodb+srv://LoginRegisterNew:L8G4Tt58cW7ZkSc8@loginregisternew.3rllnrk.mongodb.net/?retryWrites=true&w=majority",{
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

App.get("/",(req,res)=>{
    App.use(Express.static(path.resolve(__dirname,"frontend/build")));
    res.status(200).sendFile(path.resolve(__dirname,"frontend/build"));
})

App.post("/sendData",async (req,res)=>{
    const {Email,Password} = req.body;
    MondelDB.findOne({Email:Email},async (err,user)=>{
        if(user){
            if(user.Password === Password){
                await res.status(200).send({message:"User Logined",user:user});
            }
            else{
                await res.status(200).send({message:"Password is In-Correct"});
            }
        }
        else{
            await res.status(200).send({message:"User Not Registerted"});
        }
    })

    // console.log(Data);
    // res.send(req.body);
})

App.post("/saveData",async (req,res)=>{
    // console.log(req.body)
    const {Name, Email, Password} = req.body;
    // console.log(Email)
    MondelDB.findOne({Email:Email},async (err,resData)=>{
        if(resData){
            await res.status(409).send({message:"User Already Exists"})
        }
        else{
            const Data = await MondelDB.insertMany([{Name:Name,Email:Email,Password:Password}])
            await res.status(200).send({message:"User Registered"})
            // console.log(Data)
        }
    })
    })    
    
const port = process.env.PORT || 8000;
// const port = 8000;
App.listen(port,()=>{
    console.log(`Connected at Port ${port}`)
})