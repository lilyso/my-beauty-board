const router = require('express').Router();
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


module.exports = router;
