// 1. import the model
const List = require("../models/list.model")
const User = require("../models/user.model")
// 2. export all the functions with placeholder
module.exports.apiTest = (req, res)=>{
    res.json({message: "SlashBud is running"})
}

module.exports.newList = (req,res) => {
    const userId = req.params.id
    const newList = new List(req.body)
    newList.user = userId
    newList.save()
        .then(list=>{
            const user = User.findOne({_id:userId})
                .then(foundUser=>{
                    foundUser.lists.push(newList)
                    foundUser.save()
                    .then(response => res.json(response))
                })
        })
        .catch(err => res.status(400).json(err))
}