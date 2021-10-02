const router = require('express').Router();
const { User,Tracker} = require('../../models');
const withAuth = require ('../../utils/auth');

//////////////////////////////////
// CREATE a New Track for User
router.post('/', withAuth, async(req, res) => {
    try {
        console.log(req.body);
          const newTracker= await Tracker.create({
            user_id: req.session.user_id,
            track_date: req.body.track_date,
            daily_weight: req.body.daily_weight,
        });

        res.status(200).json(newTracker);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

module.exports = router;

