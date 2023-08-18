// 1. import the controller
const UserController = require("../controllers/user.controller")
// 2. export a function that reads one argument (app)
const routes = (app) =>{
    app.get('/api/testing', UserController.apiTest)

}
// 3. include all the routes with the corresponding logic from controller
module.exports = routes