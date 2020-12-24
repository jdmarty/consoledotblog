const { User } = require('../models')

const users = [
  {
    name: 'Josh',
    email: 'joshu@gmail.com',
    password: 'Mariner37',
  },
  {
    name: 'Kyle',
    email: 'kyle@gmail.com',
    password: 'password12345',
  },
  {
    name: 'Ray',
    email: 'ray@gmail.com',
    password: 'password12345',
  },
];

const seedUsers = () => User.bulkCreate(users, {
  individualHooks: true,
  returning: true
});

module.exports = seedUsers;