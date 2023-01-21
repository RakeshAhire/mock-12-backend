const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../Models/user.model");

const userRoutes = Router();
userRoutes.get('/', async (req, res) => {
    res.send("user Routes")
})

userRoutes.post('/register', async (req, res) => {
    const payload = req.body;
    console.log('payload: ', payload);
    try {
        bcrypt.hash(payload.password, 8, async function (err, hash) {
            // Store hash in your password DB.
            const user = new userModel({ ...payload, password: hash });
            await user.save();
            res.send({ "msg": "sign up successfull" });
        });
    } catch (err) {
        console.log(err);
        res.send({ "msg": err });
    }
})
userRoutes.post('/login', async (req, res) => {
    const payload = req.body;
    // console.log('payload: ', payload);
    const user = await userModel.findOne({ email: payload.email });
    if (user) {
        try {
            bcrypt.compare(
                payload.password,
                user.password,
                async function (err, result) {
                    
                    if (result) {
                        // console.log('result: ', result);
                        const token = jwt.sign(
                            { userID: user._id, username: user.username },
                            "shhhhh"
                        );
                        res.send({ msg: "login Success", token });
                    } else {
                        res.send({ msg: "login failed/wrong credential", err });
                    }
                }
                
            )
        }
       catch (err) {
            console.log(err)
                res.send({ msg: "no user found",err })
        }
    }
    else{
            res.send({ msg: "no user found",err })
    }   

})

userRoutes.post('/getProfile/:id', async (req, res) => {
    const { id } = req.query;
    try {
        user = await userModel.findById({ _id: id })
        res.send(user)
    }
    catch (e) {
        console.log(e)
    }
})
userRoutes.post('/calculate', async (req, res) => {
    const { AIAmount, AIRate, TotalYears } = req.body;
    try {
        let F = 0;
        let P = AIAmount;
        let i = AIRate / 100;
        let n = TotalYears;
        F = P * [(((1 + i) ** n) - 1) / i];
        res.send(F)
    }
    catch (e) {
        console.log(e)
    }
})

module.exports = { userRoutes }