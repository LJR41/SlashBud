// 1. import the model
const User = require("../models/user.model")
// 2. export all the functions with placeholder
module.exports.apiTest = (req, res)=>{
    res.json({message: "SlashBud is running"})
}
module.exports.allUsers = (req, res) => {
    User.find()
        .then(allUsers => res.json(allUsers))
        .catch(err => res.status(400).json(err))
}
module.exports.oneUser = (req, res) => {
    User.findOne({_id:req.params.id}).populate("lists")
        .then(oneUser => res.json(oneUser))
        .catch(err => res.status(400).json(err))
}
module.exports.newUser = (req,res) =>{
    User.create(req.body)
        .then(newUser =>res.json(newUser)
        .catch(err => res.status(400).json(err)))
}

module.exports.test = (req,res) =>{
    fetch(`https://www.giantbomb.com/api/game/3030-4725/?api_key=1adb8bb2ac75173966a5fdace6fc55e3568c915c&format=json`, {headers :{ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*', 'Access-Control-Allow-Credentials':true} })
        .then(newUser =>newUser.json())
        .then(data => {
            console.log(data)
            res.json(data)
        })
        .catch(err => res.status(400).json(err))
}