const router = require('express').Router();
const {Tracker} = require('../../models');
const withAuth = require ('../../utils/auth');
const dataHelper = require ('../../utils/helpers');

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

// create Route for using data in chart
router.get("/", withAuth, async (req, res) => {
    try {
      const progressData = await Tracker.findAll({
        where: {
          user_id: req.session.user_id,
        },
        order: [["track_date", "ASC"]],
      });
      let arrayData = [] ;
      const progresses = progressData.map((progress) => progress.get({ plain: true }));
      console.log("for loop started");
      for(x of progresses) {
          arrayData.push([dataHelper.format_date(x.track_date), x.daily_weight]);
      }
      console.log(JSON.parse(JSON.stringify(arrayData)));
        // console.log(`arrayData: ${arrayData}`);
    const  dataChart = JSON.parse(JSON.stringify(arrayData));
      res.status(200).json(dataChart);
     
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;

