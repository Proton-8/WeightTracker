const router = require('express').Router();
const userRoute = require('./userRoutes');
const trackerRoute = require('./trackerRoutes')
const signupRoute = require('./signupRoutes')


router.use('/users', userRoute);

router.use('/trackers', trackerRoute);

router.use('/signups', signupRoute);

module.exports = router;