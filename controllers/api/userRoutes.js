const router = require('express').Router();
const { User, Track, Tracker } = require('../../models');
const withAuth = require ('../../utils/auth');

router.post('/', async(req, res) => {
    try {
        //first we check to see if the user is already in the database.
        let userData = await User.findOne({
            where: {
                // full_name: req.body.name,
                email: req.body.email,
            }
        })
        
        //if the user is not existed in the database, we create a new user.
        if (!userData) {
            userData = await User.create(req.body);
        }

        const user = userData.get({ plain: true });

        await Tracker.create({
            track_date: req.body.start_date,
            daily_weight: req.body.current_weight,
            user_id: user.id,
        });

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