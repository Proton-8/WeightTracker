const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('homepage', {
        logged_in: req.session.logged_in
    });

});

// original starting code stuff -----------

// router.get('/login', (req, res) => {
//     res.render('login', {
//         logged_in: req.session.logged_in
//     });




//   better code :-) --------

// Login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });  





// });


module.exports = router;