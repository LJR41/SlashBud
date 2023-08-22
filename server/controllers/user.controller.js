// 1. import the model
const User = require("../models/user.model")
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
module.exports.newUser = (req, res) => {
    User.create(req.body)
        .then(newUser => res.json(newUser)
            .catch(err => res.status(400).json(err)))
}

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