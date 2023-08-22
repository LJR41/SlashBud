// 1. import the model
const User = require("../models/user.model")
const { response } = require("express")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { secret } = require('../configs/jwt')
// 2. export all the functions with placeholder
module.exports.apiTest = (req, res) => {
    res.json({ message: "SlashBud is running" })
}
module.exports.allUsers = (req, res) => {
    User.find()
        .then(allUsers => res.json(allUsers))
        .catch(err => res.status(400).json(err))
}
module.exports.oneUser = (req, res) => {
    User.findOne({ _id: req.params.id }).populate("lists")
        .then(oneUser => res.json(oneUser))
        .catch(err => res.status(400).json(err))
}
// module.exports.newUser = (req, res) => {
//     User.create(req.body)
//         .then(newUser => res.json(newUser)
//             .catch(err => res.status(400).json(err)))
// }

module.exports.register = (req, res) => {
    const user = new User(req.body)
    user.save()
        .then(() => {
            res.cookie("usertoken", jwt.sign({ _id: user._id }, secret), {httpOnly: true})
            .json({msg: "Success in creating a user", user:user})
        })
        .catch(err => res.json(err))
}

module.exports.login = (req, res) => {
    User.findOne({email: req.body.email})
    .then(user=> {
        if(user === null) {
            res.json({msg:"invalid login info"})
        } else {
            bcrypt.compare(req.body.password, user.password)
            .then(passwordIsValid => {
                if(passwordIsValid) {
                    res.cookie("usertoken", jwt.sign({_id: user._id}, secret), {httpOnly:true})
                    .json({msg:"success"})
                } else {
                    res.json({msg:"Invalid login Info"})
                }
            })
            .catch(err=> res.json({msg: "invalid login attempt"}))
        }
    })
    .catch(err=> res.json(err))
}

module.exports.test = (req, res) => {
    
}