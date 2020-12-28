const router = require('express').Router();
const { User } = require('../../models');

//create new user
router.post('/create', async (req, res) => {
  try {
    //look for a user with this email
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });
    //if there is a user with this email, send an error message and return
    if (existingUser) {
      res
        .status(400)
        .json({ message: 'Account with this username already exists, please try again' });
      return;
    }
    //otherwise, create a new user
    const userData = await User.create(req.body);
    //set loggedIn to true and save the user id in session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.name;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//log in existing user
router.post('/login', async (req, res) => {
  try {
    //find a user with that email
    const userData = await User.findAll({ where: { email: req.body.email } });
    //if no user is found with that email, send an error message and return
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    //check password input against stored password
    const validPassword = await userData.checkPassword(req.body.password);
    //if the passwords do not match, send an error message and return
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    //set loggedIn to true and save the user id in session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.name;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//logout a user
router.post('/logout', (req, res) => {
  //destroy the existing session
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
