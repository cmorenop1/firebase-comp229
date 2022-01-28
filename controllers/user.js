exports.user = function(req, res, next) {
    res.render('user', { 
        title: 'Users',
        name: 'Student'
    });
}

exports.julio = function(req, res, next) {
    res.render('user', { 
        title: 'User',
        name: 'Julio'
    });
}