const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//GET ROUTES==================================================
//get all posts
router.get('/', async (req, res) => {
  try {
    //retrieve all posts
    const postData = await Post.findAll({
      //include user and comment
      include: [
        { model: User, attributes: ['id', 'name'] },
        {
          model: Comment,
          attributes: ['content', 'comment_date', 'updated_date'],
        },
      ],
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

//get a post by id
router.get('/:id', async (req, res) => {
  try {
    //retrieve a single post by id
    const postData = await Post.findByPk(req.params.id, {
      //include user and comment
    });
    //if nothing was retrieved, send an error message
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//==========================================================

//POST ROUTES===============================================
//create a new post
router.post('/', async (req, res) => {
  try {
    //attach current user id to request body
    req.body.user_id = req.session.user_id
    //create a new Post from the provided body
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
//=====================================================

//PUT ROUTES===========================================
//update an existing post
router.put('/:id', async (req, res) => {
  try {
    //update Post with new data at the provided id
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
        updated_date: new Date(),
        recent_date: new Date()
      },
      {
        where: { id: req.params.id },
      }
    );
    //if no matching model was found, send message
    if (!updatedPost[0]) {
      res.status(404).json({ message: 'No post update performed' });
      return;
    }
    //if an update was performed, send an object describing the changes
    res.status(200).json({
      message: `Post ${req.params.id} updated`,
      postsUpdated: updatedPost[0],
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//=====================================================

//DELETE ROUTES========================================
//delete an existing post by id
router.delete('/:id', async (req, res) => {
  try {
    //delete a Post at the provided id
    const deletedPost = await Post.destroy({
      where: { id: req.params.id },
    });
    //if no matching model was found, send message
    if (!deletedPost) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    //if a Post was destroyed, send an object describing the changes
    res.status(200).json({
      message: `Post ${req.params.id} deleted`,
      deletedPost,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//=====================================================

module.exports = router;
