const router = require('express').Router();
const { Review, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all reviews
router.get('/', (req, res) => {
  Review.findAll({
    include: [
      {
        model: User,
      },
    ],
  }).then((data) => {
    res.json(data);
  });
});

//find a single review by id
router.get('/:id', (req, res) => {
  Review.findByPk(req.params.id, {
    include: [
      {
        model: User,
      },
    ],
  }).then((data) => {
    res.json(data);
  });
});

//Update a review by id
router.put('/:id', (req, res) => {
  Review.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((data) => {
    res.json(data);
  });
});

//add a review
router.post('/', withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      user_id: req.session.user_id,
      brand: req.body.brand,
      type: req.body.type,
      price: req.body.price,
      description: req.body.description,
      link: req.body.link,
      c_url: req.body.c_url,
    });
    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete a review
router.delete('/:id', (req, res) => {
  Review.destroy({
    where: {
      id: req.params.id,
    },
  }).then((data) => {
    res.json(data);
  });
});

module.exports = router;
