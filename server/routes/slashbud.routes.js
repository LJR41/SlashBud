// 1. import the controller
const UserController = require("../controllers/user.controller")
const ListController = require("../controllers/list.controller")


// 2. export a function that reads one argument (app)
const routes = (app) =>{
    app.get('/api/testing', UserController.apiTest)
    app.get('/api/users', UserController.allUsers)
    app.post('/api/register', UserController.register)
    app.post('/api/login', UserController.login)
    app.get('/api/test', UserController.test)
    app.post('/api/users', UserController.newUser)
    app.post('/api/games', UserController.allGames)
    app.post('/api/genres', UserController.allGenres)
    app.post('/api/platforms', UserController.allPlatforms)

    // List Routes
    app.get('/api/lists', ListController.apiTest )
    app.post('/api/lists/:id', ListController.newList)
}
// 3. include all the routes with the corresponding logic from controller
module.exports = routes