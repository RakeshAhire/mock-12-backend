const { Router } = require("express");
const { userModel } = require("../Models/user.model");

const userRoutes = Router();

userRoutes.post('/register', async (req, res) => {
    const payload = req.body;
    try {
        const user = new userModel(payload);
        await user.save()
        res.send("ok")
    }
    catch (e) {
        console.log(e)
    }
})
userRoutes.post('/login', async (req, res) => {
    try {
        res.send("ok")
    }
    catch (e) {
        console.log(e)
    }
});

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
        F = P[(((1 + i)^n)-1) / i];
        res.send("ok")
    }
    catch (e) {
    console.log(e)
}
})

module.exports = { userRoutes }