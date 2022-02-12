const express = require("express");
const mongoose = require("mongoose");

const app = express()


const connectionString = 'mongodb://localhost:27017/contactsDB';

mongoose.connect(connectionString,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
},(err) =>{
    if (err) {
        console.log(err)
    }else {
        console.log('contact database connection succesful')
    }
});

const userSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Message: String,
    
})
const User = mongoose.model('user',userSchema)

app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

app.post('/contact',(req, res) => {
   
    const {Name, Email, Message} = req.body;
   console.log(req.body)
   User.create({
        Name:req.body.Name,
        Email:req.body.Email,
        Message:req.body.Message
    },(err)=>{
        if (err) {
            return console.log("error")
        } else {
            return console.log("new user saved")
        }
    })
 
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));