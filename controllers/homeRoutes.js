const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('homepage', {
        logged_in: req.session.logged_in,
        // needed ??
        user_name: req.session.user_name
    });

});

// needed ????  ASK for help

// router.get('/userprofile', withAuth, async(req, res) => {
//   try {
//       const userData = await User.findAll({
//           where: {
//               user_id: req.session.user_id,
//           },
//       });

//       const trackers = projectData.map((project) => project.get({ plain: true }));

//       res.render('userprofile', {
//           projects,  ????
//           logged_in: req.session.logged_in,
//           user_name: req.session.user_name
//       });
//   } catch (err) {
//       res.status(500).json(err);
//   }
// });



// Better Login Route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });  

// needed ???
  router.get('/signup', (req, res) => res.render('signup'));



module.exports = router;