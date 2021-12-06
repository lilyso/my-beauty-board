const router = require('express').Router();
const { Review, User, Comment } = require('../models');
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

router.get('/reviews', withAuth, async (req, res) => {
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
    // Pass serialized data and session flag into template
    res.render('review', {
      layout: 'beautyboard',
      reviews,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Renders the about page from the homepage
router.get('/about', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ['fname', 'lname'],
        },
      ],
    });

    const reviews = reviewData.map((review) => review.get({ plain: true }));

    res.render('about', {
      layout: 'beautyboard',
      reviews,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Review }],
    });
    const user = userData.get({ plain: true });
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

router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//Able to add comments
router.get('/review/:id', async (req, res) => {
  let userId = req.session.user_id;
  // Get article by id and JOIN wit user and comment data
  try {
    const reviewData = await Review.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
        // Comment table JOIN with User to get username
        { model: Comment, include: [{ model: User }] },
      ],
    });

    const reviews = reviewData.get({ plain: true });

    res.render('comments', {
      layout: 'beautyboard',
      ...reviews,
      logged_in: req.session.logged_in,
      uid: userId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
