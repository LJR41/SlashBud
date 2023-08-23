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

module.exports.loggedUser = (req,res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete:true})
    User.findById(decodedJWT.payload._id)
    .then(user=> res.json({user}))
    .catch(err=> res.json(err))
}

module.exports.logout = (req,res) => {
    res.cookie("usertoken", jwt.sign({_id:""}, secret), {
        httpOnly:true,
        maxAge:0
    }).json({msg:"User logged out"})
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

// module.exports.test = (req, res) => {
    
// module.exports.newUser = (req, res) => {
//     User.create(req.body)
//         .then(newUser => res.json(newUser)
//             .catch(err => res.status(400).json(err)))
// }

module.exports.allGames = (req, res) => {
    const key = process.env.APIKEY
    fetch(
        "https://cigkr3iwhd.execute-api.us-west-2.amazonaws.com/production/v4/games",
        {
            method: 'POST',
            headers: {
                'x-api-key': `${key}`,
            },
            body: "fields name,genres,platforms;"
        })
        .then(response => {
            return response.json();

        })
        .then(response => {
            return res.json(response)
        })
        .catch(err => {
            console.error(err);
        });
}

module.exports.allGenres = (req, res) => {
    const key = process.env.APIKEY
    fetch(
        "https://cigkr3iwhd.execute-api.us-west-2.amazonaws.com/production/v4/genres",
        {
            method: 'POST',
            headers: {
                'x-api-key': `${key}`,
            },
            body: "fields name; limit 50;"
        })
        .then(response => {
            return response.json();

        })
        .then(response => {
            return res.json(response)
        })
        .catch(err => {
            console.error(err);
        });
}

module.exports.allPlatforms = (req, res) => {
    const key = process.env.APIKEY
    fetch(
        "https://cigkr3iwhd.execute-api.us-west-2.amazonaws.com/production/v4/platforms",
        {
            method: 'POST',
            headers: {
                'x-api-key': `${key}`,
            },
            body: "fields name; limit 300;"
        })
        .then(response => {
            return response.json();

        })
        .then(response => {
            return res.json(response)
        })
        .catch(err => {
            console.error(err);
        });
}

module.exports.searchGames = (req, res) => {
    const key = process.env.APIKEY
    const name = req.body.gameSearch
    fetch(
        "https://cigkr3iwhd.execute-api.us-west-2.amazonaws.com/production/v4/games",
        {
            method: 'POST',
            headers: {
                'x-api-key': `${key}`,
            },
            body: `search "${name}";fields name,rating;`
        })
        .then(response => {
            return response.json();

        })
        .then(response => {
            return res.json(response)
        })
        .catch(err => {
            console.error(err);
        });
}