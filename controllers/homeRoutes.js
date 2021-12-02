const router = require('express').Router();
const { Review, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all articles and JOIN with user data
    const reviewData = await Review.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    const reviews = reviewData.map((review) => review.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      reviews,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/reviews', async (req, res) => {
  try {
    // Get all reviews and JOIN with user data
    const reviewData = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ['fname', 'lname'],
        },
      ],
    });

    // Serialize data so the template can read it

    const reviews = reviewData.map((review) => review.get({ plain: true }));
    console.log(reviews);
    // Pass serialized data and session flag into template
    res.render('review', {
      layout: "beautyboard",
      reviews,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/review', async (req, res) => {
//   try {
//     const reviewData = await Review.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['fname', 'lname'],
//         },
//       ],
//     });

//     const review = reviewData.get({ plain: true });

//     res.render('review', {
//       ...review,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Review }],
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render('profile', {
      layout: 'beautyboard',
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login', {
    layout: 'beautyboard',
  });
});

module.exports = router;
