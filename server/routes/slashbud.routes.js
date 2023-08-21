// 1. import the controller
const UserController = require("../controllers/user.controller")
const ListController = require("../controllers/list.controller")
// 2. export a function that reads one argument (app)
const routes = (app) =>{
    app.get('/api/testing', UserController.apiTest)
    app.get('/api/users', UserController.allUsers)
    app.post('/api/users', UserController.newUser)
    app.get('/api/test', UserController.test)

    // List Routes
    app.get('/api/lists', ListController.apiTest )
    app.post('/api/lists/:id', ListController.newList)
}
// 3. include all the routes with the corresponding logic from controller
module.exports = routes