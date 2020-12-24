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
          attributes: ['content', 'comment_date', 'updated_date'],
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

//login page route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login', {
    login: true
  });
});

module.exports = router;
