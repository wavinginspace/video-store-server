const knex = require('knex');
const app = require('../src/app');
const { makeCollectionsArray } = require('./collections.fixtures');

describe.only('Collections Endpoints', function() {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('clean the table', () =>
    db.raw(
      'TRUNCATE films, collections, film_collections RESTART IDENTITY CASCADE'
    )
  );

  this.afterEach('cleanup', () =>
    db.raw(
      'TRUNCATE films, collections, film_collections RESTART IDENTITY CASCADE'
    )
  );

  describe('GET /api/collections', () => {
    context('Given no collections', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/collections')
          .expect(200, []);
      });
    });

    context('Given collections in the database', () => {
      const testCollections = makeCollectionsArray();

      beforeEach('insert collections', () => {
        return db.into('collections').insert(testCollections);
      });

      it('responds with 200 and all notes', () => {
        let databaseCollections = testCollections.map(collection => {
          return {
            ...collection,
            collection_films: ''
          };
        });

        return supertest(app)
          .get('/api/collections')
          .expect(200, databaseCollections);
      });
    });
  });
});
