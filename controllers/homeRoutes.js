const router = require("express").Router();
const { Tracker } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  res.render("homepage", {
    logged_in: req.session.logged_in,
    // needed ??
    user_name: req.session.user_name,
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
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// needed ???
router.get("/signup", (req, res) => res.render("signup"));



// this route render all the data belong to the logged in user
router.get("/trackers", withAuth, async (req, res) => {
  try {
    const progressData = await Tracker.findAll({
      where: {
        user_id: req.session.user_id,
      },
      // order: [["event_date", "ASC"]],
    });

    const progresses = progressData.map((progress) => progress.get({ plain: true }));
    // const progress = progressData.get({plain: true});

    res.render("tracker", {
      progresses,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      track_date: req.session.track_date,
      daily_weight: req.session.daily_weight,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  console.log('==============================')
  if (req.session.logged_in) {
     
      req.session.destroy(() => {
          console.log(req.session.logged_in);
           res.status(204).end();
      });
  } else {
      res.status(404).end();
  }
});





module.exports = router;
