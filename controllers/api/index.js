const router = require('express').Router();
const usersRoute = require('./userRoutes');
const trackerRoute = require('./trackerRoutes')
// needed?? 
// const trackerRoutes = require('./trackerRoutes');



router.use('/users', usersRoute);
// needed?? 
// tracker.use('/trackers', trackerRoutes);
router.use('/trackers', trackerRoute);
module.exports = router;