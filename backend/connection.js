require("dotenv").config()
const mongoose = require('mongoose');
const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1", "8.8.8.8"]);


const url = process.env.MONGO_URI || "mongodb://localhost:27017/myDatabase";

// asynchronous function - returns promise object
mongoose.connect(url)
.then((result) => {
    console.log('database connected');
    
})
.catch((err) => {
    console.log(err);
     
});