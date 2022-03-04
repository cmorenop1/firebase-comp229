let express = require('express');
let router = express.Router();
let inventoryController = require('../controllers/inventory');

let passport = require('passport');

// helper function for guard purposes
// function requireAuth(req, res, next)
// {
//     // check if the user is logged in
//     if(!req.isAuthenticated())
//     {
//         req.session.url = req.originalUrl;
//         return res.redirect('/users/signin');
//     }
//     next();
// }

router.get('/list', inventoryController.list);

/* GET Route for displaying the Add page - CREATE Operation */
// router.get('/add', requireAuth, inventoryController.displayAddPage);
/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', passport.authenticate('jwt', {session: false}), inventoryController.processAdd);

// Routers for edit
// router.get('/edit/:id', requireAuth, inventoryController.displayEditPage);
router.put('/edit/:id', passport.authenticate('jwt', {session: false}), inventoryController.processEdit);

// Delete
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), inventoryController.performDelete);

module.exports = router;