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
    console.log(req.body)
    newList.listOwner = userId
    newList.save()
        .then(list=>{
            const user = User.findOne({_id:userId})
                .then(foundUser=>{
                    console.log(user)
                    foundUser.lists.push(newList)
                    foundUser.save({ validateBeforeSave: false })
                    .then(response => res.json(response))
                })
        })
        .catch(err => res.status(400).json(err))
}

module.exports.oneList = (req, res) => {
    List.findOne({_id: req.params.id})
    .then(oneList => res.json (oneList))
    .catch(err =>res.status(400).json(err))
}

module.exports.allLists = (req, res) => {
    const user = User.findOne({ _id: req.params.id }).populate("lists")
    .then(oneUser => res.json(oneUser))
    .catch(err => res.status(400).json(err))
}

module.exports.deleteList = (req, res)=>{
    List.deleteOne({_id: req.params.id})
    .then(status => res.json(status))
    .catch(err => res.status(400).json(err))
}

module.exports.addToList = (req,res) => {
    console.log(req.body)
    List.findOneAndUpdate({_id:req.params.id},{ $push : {listObjects :req.body }})
    .then(updatedList =>{
        console.log(res.json(updatedList))
    } )
    .catch(err => res.status(400).json(err))
}

module.exports.addCharacterToList = (req,res) => {
    console.log(req.body)
    List.findOneAndUpdate({_id:req.params.id},{ $push : {listObjects : {title: req.body.title, imageURL: req.body.imageURL}}})
    .then(updatedList =>{
        console.log(res.json(updatedList))
    } )
    .catch(err => res.status(400).json(err))
}

module.exports.removeFromList = (req,res) => {
    console.log(req.body)
    List.findOneAndUpdate({_id:req.params.id},{ $pull : {listObjects: {_id: req.body} }})
    .then(updatedList =>{
        console.log(res.json(updatedList))
    } )
    .catch(err => res.status(400).json(err))
}