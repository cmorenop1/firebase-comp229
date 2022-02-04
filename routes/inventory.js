let express = require('express');
let router = express.Router();

let moongose = require('mongoose');

let Inventory = require('../models/inventory');

router.get('/list', function(req, res, next) {
    Inventory.find((err, inventoryList) => {
        
        if(err)
        {
            return console.error(err);
        }
        else{
            console.log(inventoryList);
        }
    });

    res.render('index', { title: 'About' });
  });

module.exports = router;