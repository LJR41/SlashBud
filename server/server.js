// 1. import all dependencies  
// - express, create app with express, .env (THIS IS NEW)\
const express = require("express");
const app = express();
require('dotenv').config();
const cors = require('cors')
const cookies = require('cookie-parser')

const port = process.env.PORT
// 4. import mongoose.config (after config is complete)
require("./configs/mongoose.config")
// 2. configure express with app.use
app.use(cors({
    credentials: true, origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(cookies());
app.use(express.urlencoded({extended: true}));

// Listen on a specific host via the HOST environment variable
// var host = process.env.HOST || '127.0.0.1';
// Listen on a specific port via the PORT environment variable
// var port = process.env.PORT || 8080;

// var cors_proxy = require('cors-anywhere');
// cors_proxy.createServer({
//     originWhitelist: [], // Allow all origins
//     requireHeader: ['origin', 'x-requested-with'],
//     removeHeaders: ['cookie', 'cookie2']
// }).listen(port, host, function() {
//     console.log('Running CORS Anywhere on ' + host + ':' + port);
// });


// 5. import routes (after routes are done -- may need to complete the models & the backbone of the controller first)
const routes = require("./routes/slashbud.routes");
routes(app)
// 3. listen to the port at the end
app.listen(port, (console.log(`Listening on port:${port}`)))

