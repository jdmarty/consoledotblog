const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

//homepage route
router.get('/', async (req, res) => {
  try {
    //retrieve all new posts
    const postsData = await Post.findAll({
      //include user and comment
      include: [
        { model: User, attributes: ['id', 'name'] },
        {
          model: Comment,
          attributes: ['content', 'comment_date'],
        },
      ],
      //sort by most recent post
      order: [['post_date', 'DESC']],
      //limit set by query or defaults to 20
      limit: parseInt(req.query.limit) || 20,
    });
    //serialize new post data
    const posts = postsData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
      home: true,
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//dashboard route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    //get recent posts made by this user
    const userPostsData = await Post.findAll({
      where: { user_id: req.session.user_id },
      //limit set by query or defaults to 20
      limit: parseInt(req.query.post_limit) || 20,
      order: [['post_date', 'DESC']],
    });
    const userPosts = userPostsData.map((post) => post.get({ plain: true }));

    //get recent comments made by this user
    const userCommentsData = await Comment.findAll({
      where: { user_id: req.session.user_id },
      //include information about original post
      include: { model: Post },
      //limit set by query or defaults to 20
      limit: parseInt(req.query.comment_lit) || 20,
      order: [['comment_date', 'DESC']],
    });
    const userComments = userCommentsData.map((comm) =>
      comm.get({ plain: true })
    );

    //send retrieved data
    res.render('dashboard', {
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
      userPosts,
      userComments,
      dashboard: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/view/:id', async (req, res) => {
  try {
    //get a single post by id
    const postData = await Post.findByPk(req.params.id, {
      include: { model: User, attributes: ['id', 'name'] },
    });
    const post = postData.get({ plain: true });
    //get all comments for a single post
    const commentsData = await Comment.findAll({
      where: { post_id: req.params.id },
      include: { model: User, attributes: ['id', 'name'] },
    });
    const comments = commentsData.map((comm) => comm.get({ plain: true }));
    //send the retrieved data
    res.render('view', {
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
      post,
      comments,
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

//login page route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login', {
    login: true
  });
});

module.exports = router;
