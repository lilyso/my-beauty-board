const router = require('express').Router();
const { Review, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Get all comments (passed)
router.get('/', (req, res) => {
    Comment.findAll({
        include: [{
            model: Review
        }]
    }).then(data => {
        console.log(data);
        res.json(data)
    })
});

//find a single comment by id (passed)
router.get('/:id', (req, res) => {
    Comment.findByPk(req.params.id, {
        include: [{
            model: Review
        }]
    }).then(data => {
        console.log(data);
        res.json(data)
    })
});

//Create a comment (passed)
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            post_id: req.params.id
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

//Update a comment (passed)
router.put('/:id', (req, res) => {
    Comment.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(data => {
            console.log(data);
            res.json(data)
        })
});

// Delete a comment by id 
router.delete('/:id', (req, res) => {
    Comment.destroy({
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