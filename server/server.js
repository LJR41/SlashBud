// 1. import all dependencies  
// - express, create app with express, .env (THIS IS NEW)\
const express = require("express");
const app = express();
require('dotenv').config();
const cors = require('cors')

const port = process.env.PORT
// 4. import mongoose.config (after config is complete)
require("./configs/mongoose.config")
// 2. configure express with app.use
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 5. import routes (after routes are done -- may need to complete the models & the backbone of the controller first)
const routes = require("./routes/slashbud.routes")
routes(app)
// 3. listen to the port at the end
app.listen(port, (console.log(`Listening on port:${port}`)))

