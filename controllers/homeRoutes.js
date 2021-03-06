const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require('sequelize');

//function to get post data
const getPosts = async (params, order='recent_date') => {
  const postsData = await Post.findAll({
    where: params,
      //include user and comment
      include: [
        { model: User, attributes: ['id', 'name'] },
        {
          model: Comment,
          attributes: ['content', 'comment_date'],
        },
      ],
      //sort by most recent post
      order: [[order, 'DESC']],
      //limit 20 posts
      limit: 25,
    });
  //serialize new post data
  const posts = postsData.map((post) => post.get({ plain: true }));
  return posts
}

//homepage route
router.get('/', async (req, res) => {
  try {
    let posts, sortOption
    // Raw route returns all posts
    if (!req.query.sort) {
      posts = await getPosts({})
      sortOption = "All Posts"
    // sorting by new returns posts sorted by post date
    } else if (req.query.sort === 'new') {
      posts = await getPosts({}, 'post_date');
      sortOption = 'New';
    // sorting by updated returns posts with updated_date
    } else if (req.query.sort === 'updated') {
      posts = await getPosts({ updated_date: { [Op.not]: null } });
      sortOption = 'Updated';
    // sorting by comments returns all posts then sorts by number of comments
    } else if (req.query.sort === 'comments') {
      posts = await (await getPosts({})).sort((a,b) => b.comments.length - a.comments.length)
      sortOption = 'Comments';
    }
    //send the new data
    res.render('homepage', {
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
      home: true,
      posts,
      sortOption
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
      limit: parseInt(req.query.post_limit) || 10,
      order: [['recent_date', 'DESC']],
    });
    const userPosts = userPostsData.map((post) => post.get({ plain: true }));

    //get recent comments made by this user
    const userCommentsData = await Comment.findAll({
      where: { user_id: req.session.user_id },
      //include information about original post
      include: { model: Post },
      //limit set by query or defaults to 20
      limit: parseInt(req.query.comment_limit) || 10,
      order: [['comment_date', 'DESC']],
    });
    const userComments = userCommentsData.map((comm) => comm.get({ plain: true }));

    //get the current limit on posts and comments
    const postLimit = parseInt(req.query.post_limit) || 10
    const commentLimit = parseInt(req.query.comment_limit) || 10

    //send retrieved data
    res.render('dashboard', {
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      user_name: req.session.user_name,
      userPosts,
      userComments,
      postLimit: postLimit + 5,
      commentLimit: commentLimit +5,
      dashboard: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

//view post route
router.get('/view-post/:id', async (req, res) => {
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
      order: [['comment_date', 'DESC']]
    });
    const comments = commentsData.map((comm) => comm.get({ plain: true }));

    //send the retrieved data
    res.render('view-post', {
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      user_name: req.session.user_name,
      post,
      comments,
      viewPost: true
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
