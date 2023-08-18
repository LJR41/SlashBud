// 1. import mongoose
const mongoose = require('mongoose')
// 2. create a uri variable that shows the connection url. 
// 2.1 Make sure you use .env for the sensitive information like the link or password or username
// 2.2 Make sure you console log and check if the route is good before you connect to the database. 

const uri = process.env.URI

// 3. When connecting to the database, check your server terminal for the successful connection message. 
mongoose.connect(uri)
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));
// Check the code from the platform
// You may need to go to Atlas to update the IP access
