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
      include: { model: User, attributes: ['id', 'name'] },
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

//PUT ROUTES================================================
//update an existing comment
router.put('/:id', async (req, res) => {
  try {
    //update comment with new data at the provided id
    const updatedComment = await Comment.update(
        {
            content: req.body.content,
            updated_date: new Date()
        }, 
        {
            where: { id: req.params.id },
        }
    );
    //if no matching model was found, send message
    if (!updatedComment[0]) {
      res.status(404).json({ message: 'No post update performed' });
      return;
    }
    //if an update was performed, send an object describing the changes
    res.status(200).json({
      message: `Comment ${req.params.id} updated`,
      commentsUpdated: updatedComment[0],
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//==========================================================

//DELETE ROUTES========================================
//delete an existing comment by id
router.delete('/:id', async (req, res) => {
  try {
    //delete a comment at the provided id
    const deletedComment = await Comment.destroy({
      where: { id: req.params.id },
    });
    //if no matching model was found, send message
    if (!deletedComment) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    //if a comment was destroyed, send an object describing the changes
    res.status(200).json({
      message: `Comment ${req.params.id} deleted`,
      deletedComment,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//=====================================================

module.exports = router;
