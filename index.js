const express = require("express");
const {Usermodel ,Todomodel} = require("./db");     
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const connection = mongoose.connect("mongodb+srv://chavdasharad77:(Sharad_77_)@cluster0.vbssd.mongodb.net/user_app");

const secrate = "sharad";

const app = express();
app.use(express.json());

app.post("/signup",async(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    await Usermodel.create({
        email:email,
        password:password,
        name:name 
    });

    res.json({
        message:"You are Logged in"
    })

});

app.post("/signin", async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;


    //make sure that make user variable to asyncronuos;
    const user = await Usermodel.findOne({
        email:email,
        password:password
    })

    if(user){
        const token = jwt.sign({
            id: user._id.toString()
        },secrate)
        res.send({
            token:token
        })
    } else {
        res.status(403).json({
        message:"Your Cresentialn are incorrect"
        })
    }
});

function auth (req,res,next) {
    const token = req.headers.token;
    const decode = jwt.verify(token,secrate);

    if(decode) {
        req.userid = decode.id
        next();
    } else {
        res.status(403).json({
            message:"Incorrect credentials"
        })
    }
}

app.post("/todo",auth,async (req,res) => {
    const userId = req.userid;
    const title= req.body.title;

    const todos = await Todomodel.create({
        title,
        userId
    })

    console.log("Todo Has been created",todos)

    res.json({
        userId:userId
    })
});

app.get("/todos",auth, async (req,res) => {
    const userId = req.userid;
    
   const Todo = await Todomodel.find({
        userId: userId
    })

    res.json({
        Todo
    })
});

app.listen(3000);