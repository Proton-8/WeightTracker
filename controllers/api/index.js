const router = require('express').Router();
const usersRoute = require('./userRoutes');

// needed?? 
// const trackerRoutes = require('./trackerRoutes');



router.use('/users', usersRoute);
// needed?? 
// tracker.use('/trackers', trackerRoutes);

module.exports = router;