const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    //retrieve all posts
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
    //serialize data
    const posts = postsData.map((post) => {
      obj = post.get({plain: true})
      obj.leadSentence = obj.content.split('.')[0]+'.'
      return obj
    })
    res.render('homepage', {
      logged_in: req.session.logged_in,
      home: true,
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
