exports.home = function(req, res, next) {
    // res.render('index', { 
    //     title: 'Home',
    //     userName: req.user ? req.user.username : '' 
    // });
    return res.redirect('/inventory/list');
}

// exports.projects = function(req, res, next) {
//     res.render(
//         'index', 
//         { 
//             title: 'Projects',
//             userName: req.user ? req.user.username : '' 
//         }
//     );
// }