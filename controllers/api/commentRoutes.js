const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//GET ROUTES==================================================
//get all comments for a single post
router.get('/post/:id', async (req, res) => {
  try {
    //retrieve all posts
    const commentData = await Comment.findAll({
      //where the post id matches
      where: { post_id: req.params.id },
      //include user and comment
      include: { model: User, attributes: ['id', 'name']},
      //sort by most recent comment
      order: [['comment_date', 'DESC']],
      //limit set by query or defaults to 20
      limit: parseInt(req.query.limit) || 20,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});
//==========================================================

//POST ROUTES===============================================
//create a new comment
router.post('/', async (req, res) => {
  try {
    //create a new Comment from the provided body
    const newComment = await Comment.create(req.body);
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});
//==========================================================


module.exports = router;