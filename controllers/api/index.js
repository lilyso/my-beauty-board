const router = require('express').Router();
const userRoutes = require('./userRoutes');
<<<<<<< HEAD
const projectRoutes = require('./reviewRoutes');
=======
const reviewRoutes = require('./reviewRoutes');
>>>>>>> main

router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
