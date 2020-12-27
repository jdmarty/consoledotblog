const { Post } = require('../models')

const posts = [
  {
    title: 'First Post',
    content: 'This my first post to this blog!',
    user_id: 1,
  },
  {
    title: 'Random Text',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non purus vitae ex rhoncus dictum. Donec ullamcorper fringilla faucibus. Nullam elementum porttitor lorem congue pellentesque. Sed iaculis tincidunt feugiat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin posuere ultricies tellus, vitae pharetra lacus ultrices nec. Pellentesque nibh nisi, malesuada in nibh eu, bibendum tristique velit. Maecenas nec accumsan ex. Aenean vitae ipsum a lacus tincidunt tempor eu ut ligula. Suspendisse potenti. Mauris feugiat interdum eros et hendrerit. Phasellus non velit vestibulum, euismod nisl vel, aliquet ligula.',
    user_id: 1,
  },
  {
    title: 'The Lions are bad and here is why',
    content: 'I mean just look at them.',
    user_id: 2,
  },
  {
    title: 'Building cars',
    content:
      'Ford Motor Company, commonly known as Ford, is an American multinational automaker that has its main headquarters in Dearborn, Michigan, a suburb of Detroit. It was founded by Henry Ford and incorporated on June 16, 1903. The company sells automobiles and commercial vehicles under the Ford brand, and most luxury cars under the Lincoln brand. Ford also owns Brazilian SUV manufacturer Troller, an 8% stake in Aston Martin of the United Kingdom and a 32% stake in Jiangling Motors.[7] It also has joint-ventures in China (Changan Ford), Taiwan (Ford Lio Ho), Thailand (AutoAlliance Thailand), Turkey (Ford Otosan), and Russia (Ford Sollers). The company is listed on the New York Stock Exchange and is controlled by the Ford family; they have minority ownership but the majority of the voting power.',
    user_id: 2,
  },
  {
    title: 'Random Basketball Stuff',
    content: 'I like the Pistons even though they are also bad.',
    user_id: 2,
  },
  {
    title: 'Optical transistor',
    content:
      'An optical transistor, also known as an optical switch or a light valve, is a device that switches or amplifies optical signals.',
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(posts);

module.exports = seedPosts;
