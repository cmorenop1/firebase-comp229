// Do not use it in production
let DB_CONNECTION = "mongodb+srv://dbadmin:GriLAkPfVZebeg58@clusters002.5ikxx.mongodb.net/comp229002"

// Database Setup
let mongoose = require('mongoose');

module.exports = function(){  

    // Connect to the DB
    mongoose.connect(DB_CONNECTION);

    let mongoDB = mongoose.connection;

    mongoDB.on('error', console.error.bind(console, 'Connection Error: '));
    mongoDB.once('open', ()=>{
        console.log('Connected to MongoDB...');
    })

    return mongoDB;
}

