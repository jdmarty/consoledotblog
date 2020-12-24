const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//get all posts
router.get('/', async (req, res) => {
  try {
    //retrieve all posts
    const postData = await Post.findAll({
      //include user and comment
      include: [{ model: User }, { model: Comment }],
      //sort by most recent post
      order: [["post_date", 'DESC']],
      //limit set by query or defaults to 20
      limit: parseInt(req.query.limit) || 20
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//get a post by id
router.get('/post/:id', async (req, res) => {
  try {
    //retrieve a single post by id
    const postData = await Post.findByPk(req.params.id, {
      //include user and comment
      include: [{ model: User }, { model: Comment }],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//get all posts for a single user
router.get('/user/:id', async (req, res) => {
  try {
    //retrieve all posts by user id
    const postData = await Post.findAll({
      where: { user_id: req.params.id },
      //include user and comment
      include: [{ model: User }, { model: Comment }],
      //sort by most recent post
      order: [['post_date', 'DESC']],
      //limit set by query or defaults to 20
      limit: parseInt(req.query.limit) || 20,
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
