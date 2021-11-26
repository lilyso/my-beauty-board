const router = require('express').Router();
<<<<<<< HEAD
const { Review } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!reviewData) {
      res.status(404).json({ message: 'No review found with this id!' });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

=======
const { Review, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all reviews
router.get('/', (req, res) => {
  Review.findAll({
    include: [{
      model: User
    }]
  }).then(data => {
    console.log(data);
    res.json(data)
  })
});

//find a single review by id
router.get('/:id', (req, res) => {
  Review.findByPk(req.params.id, {
    include: [{
      model: User
    }]
  }).then(data => {
    console.log(data);
    res.json(data)
  })
});

//Update a review by id
router.put('/:id', (req, res) => {
  Review.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      console.log(data);
      res.json(data)
    })
});

//Create a review
router.post('/', (req, res) => {
  Review.create(req.body)
    .then(data => {
      console.log(data);
      res.json(data)
    })
});

//delete a review
router.delete('/:id', (req, res) => {
  Review.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      console.log(data);
      res.json(data)
    })
});


>>>>>>> main
module.exports = router;
