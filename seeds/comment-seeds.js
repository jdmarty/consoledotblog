const { Comment } = require('../models')

const comments = [
  {
    content: 'Welcome to blogging, Josh!',
    user_id: 2,
    post_id: 1,
  },
  {
    content: 'Mediocre...',
    user_id: 3,
    post_id: 1,
  },
  {
    content: 'I Like this thing',
    user_id: 3,
    post_id: 5,
  },
  {
    content: 'Hey Kyle, I think you just posted this from Wikipedia?',
    user_id: 1,
    post_id: 4,
  },
];

const seedComments = () => Comment.bulkCreate(comments)

module.exports = seedComments
