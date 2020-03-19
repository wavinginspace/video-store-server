// const knex = require('knex');
// const app = require('../src/app');
// const {
//   makeCollectionsArray,
//   makeMaliciousCollections
// } = require('./collections.fixtures');
// // const { makeCollectionsArray } = require('./collections.fixtures');

// describe('Collections Endpoints', function() {
//   let db;

//   before('make knex instance', () => {
//     db = knex({
//       client: 'pg',
//       connection: process.env.TEST_DATABASE_URL
//     });
//     app.set('db', db);
//   });

//   after('disconnect from db', () => db.destroy());

//   before('clean the table', () =>
//     db.raw(
//       'TRUNCATE films, collections, film_collections RESTART IDENTITY CASCADE'
//     )
//   );

//   this.afterEach('cleanup', () =>
//     db.raw(
//       'TRUNCATE films, collections, film_collections RESTART IDENTITY CASCADE'
//     )
//   );



// });
