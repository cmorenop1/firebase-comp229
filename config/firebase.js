let fs = require('firebase-admin');
require('dotenv').config();

let serviceAccount = require('./configFirebase');

module.exports = function(){

    fs.initializeApp(
        {
            credential: fs.credential.cert(serviceAccount)
        }
    )

    return fs.firestore();

}