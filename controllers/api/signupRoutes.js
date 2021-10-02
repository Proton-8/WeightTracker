const router = require('express').Router();
const { User} = require('../../models');
const withAuth = require ('../../utils/auth');


// CREATE a New User
router.post('/', withAuth, async(req, res) => {
    try {
          const newUser= await User.create({
            full_name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            current_weight: req.body.currentWeight,
            target_weight :req.body.targetWeight,
            start_date: req.body.startDate,
            target_date: req.body.targetDate,
        });

        res.status(200).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});



  module.exports = router;