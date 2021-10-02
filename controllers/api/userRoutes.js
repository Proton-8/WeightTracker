const router = require('express').Router();
const { User, Tracker } = require('../../models');
const withAuth = require ('../../utils/auth');

//////////////////// Elham Added //////////////////////
// creates a new user account when the user signed up for a new account.

router.post('/', async(req, res) => {
    try {
        console.log("***********************************************************");
        //first we check to see if the user is already in the database.
        let userData = await User.findOne({
            where: {
                // full_name: req.body.name,
                email: req.body.email,
            }
        })
        console.log("////////////");
        console.log(req.body);
        //if the user is not existed in the database, we create a new user.
        if (!userData) {
            userData = await User.create(req.body);
            console.log('user email :' + userData.email);
        }

        const user = userData.get({ plain: true });

            //       const newUser= await User.create({
            // full_name: req.body.name,
            // email: req.body.email,
            // password: req.body.password,
            // current_weight: req.body.currentWeight,
            // target_weight :req.body.targetWeight,
            // start_date: req.body.startDate,
            // target_date: req.body.targetDate,
            //       })

        //save the user info to the session storage.
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.user_name = user.name;
            req.session.user_email = user.email;
            req.session.logged_in = true;
            res.status(200).json(user);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});



// CREATE a New User
// router.post('/signup', withAuth, async(req, res) => {
//     try {
//           const newUser= await User.create({
//             full_name: req.body.name,
//             email: req.body.email,
//             password: req.body.password,
//             current_weight: req.body.currentWeight,
//             target_weight :req.body.targetWeight,
//             start_date: req.body.startDate,
//             target_date: req.body.targetDate,
//         });

//         res.status(200).json(newUser);
//     } catch (err) {
//         console.error(err);
//         res.status(400).json(err);
//     }
// });


/////////////////////////////End Elham////////////////////////////////////////

// router.post('/', async(req, res) => {
//     try {
//         const userData = await User.create(req.body);

//         req.session.save(() => {
//             //req.session.user_id = userData.id;
//             req.session.user_id = userData.id;
//             req.session.logged_in = true;

//             res.status(200).json(userData);
//         });
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

router.post('/login', async(req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        const user = userData.get({ plain: true });

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;

            res.json({ user: user, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
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

// My's part, userprofile route for userprofile page
router.get('/', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      console.log(req.session.user_id);
      const userData = await User.findByPk(req.session.user_id);
        // attributes: { exclude: ['password'] },
        // include: [{ model: Track }],
    //   });
      console.log('asgjfbasgfjkasfoagsvgasijg');
      console.log(userData);
    //   const user = userData.map((userinfo) => userinfo.get({ plain: true }));
      const user = userData.get({plain: true});
      console.log(user),
      res.render('userprofile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;