const express = require('express')


const router = express.Router()

const mongoose = require('mongoose')
const USER = mongoose.model("USER");
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const {Jwt_secret}=require('../keys');
const requireLogin = require('../middlewares/requireLogin');



router.post('/signup', (req, res) => {
    const { name, userName, email, password } = req.body;
    if (!name || !userName || !email || !password) {
        return res.status(422).json({ error: "please add all the fields" })
    }
    USER.findOne({ $or: [{ email: email }, { userName: userName }] })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "email already exists or username already exists" })
            }

            bcrypt.hash(password, 12)
                .then((hashedPassword) => {
                    const user = new USER({
                        name,
                        email,
                        userName,
                        password: hashedPassword
                    })
                    user.save()
                        .then(user => { res.json({ message: "Registered successfully" }) })
                        .catch(err => { console.log(err) })


                })


        })

})

router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password)

    if (!email || !password) {
        return res.status(422).json({ error: "Please add email and password" })
    }
    USER.findOne({ email: email })
        .then((savedUser) => {

            if (!savedUser) {
                return res.status(422).json({ error: "Invalid email" })
            }
            bcrypt.compare(password,savedUser.password)
            .then((match)=>{
                if(match)
                {
                    
                    const token=jwt.sign({_id:savedUser.id},Jwt_secret)
                    const {_id,name,email,userName,Photo}=savedUser
                    // console.log(token);
                    res.json({token,user:{_id,name,email,userName,Photo}})
                    // return res.status(200).json({message:"Login successfully"})

                }
                else
                {
                    return res.status(422).json({error:"Invalid password"})

                }
            })
            .catch((err)=>{
                console.log(err);
            })


        })
})
module.exports = router