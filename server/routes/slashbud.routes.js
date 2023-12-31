// 1. import the controller
const UserController = require("../controllers/user.controller")
const ListController = require("../controllers/list.controller")

const User = require("../models/user.model")
const {authenticate} = require('../configs/jwt')


// 2. export a function that reads one argument (app)
const routes = (app) =>{
    app.get('/api/testing', UserController.apiTest)
    app.get('/api/users', UserController.allUsers)
    app.get('/api/user/:id', UserController.oneUser)
    app.post('/api/register', UserController.register)
    app.post('/api/login', UserController.login)
    app.get("/api/users/loggedin", authenticate, UserController.loggedUser)
    app.get('/api/users/logout', UserController.logout)
    // app.get('/api/test', UserController.test)
    // app.post('/api/users', UserController.newUser)
    // Game Search routes
    app.post('/api/games', UserController.allGames)
    app.post('/api/genres', UserController.allGenres)
    app.post('/api/platforms', UserController.allPlatforms)
    app.post('/api/search/game', UserController.searchGames)
    app.post('/api/search/summary', UserController.searchSummary)

    //Char Search routes
    app.post('/api/search/character', UserController.searchChar)
    app.post('/api/search/image', UserController.searchCharImage)

    // List Routes
    app.get('/api/lists/:id', ListController.allLists )
    app.post('/api/lists/:id', ListController.newList)
    app.get('/api/lists/one/:id', ListController.oneList)
    app.delete('/api/list/:id',ListController.deleteList)
    app.patch('/api/list/:id', ListController.addToList)
    app.patch('/api/characters/:id', ListController.addCharacterToList)
    app.patch('/api/list/:id/remove', ListController.removeFromList)
}
// 3. include all the routes with the corresponding logic from controller
module.exports = routes