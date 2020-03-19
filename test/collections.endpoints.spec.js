const knex = require('knex');
const app = require('../src/app');
const {
  makeCollectionsArray,
  makeMaliciousCollection
} = require('./collections.fixtures');

describe('Collections Endpoints', function() {
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

      it('responds with 200 and all collections', () => {
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

    context('Given an XSS attack collection', () => {
      // const testCollections = makeCollectionsArray();
      const {
        maliciousCollection,
        expectedCollection
      } = makeMaliciousCollection();

      beforeEach('insert malicious collection', () => {
        return db.into('collections').insert([maliciousCollection]);
      });

      it('removes XSS attack content', () => {
        return supertest(app)
          .get('/api/collections')
          .expect(200)
          .expect(res => {
            expect(res.body[0].title).to.eql(expectedCollection.title);
            expect(res.body[0].notes).to.eql(expectedCollection.notes);
          });
      });
    });

    context('Given collections in the database', () => {
      const testCollections = makeCollectionsArray();

      beforeEach('insert collections', () => {
        return db.into('collections').insert(testCollections);
      });

      it('responds with 204 and removes the collection', () => {
        let databaseCollections = testCollections.map(collection => {
          return {
            ...collection,
            collection_films: ''
          };
        });
        const idToRemove = 2;
        const expectedCollections = databaseCollections.filter(
          collection => collection.id !== idToRemove
        );
        return supertest(app)
          .delete(`/api/collections/${idToRemove}`)
          .expect(204)
          .then(res => {
            return supertest(app)
              .get('/api/collections')
              .expect(expectedCollections);
          });
      });
    });

    describe('POST /api/collections', () => {
      it('creates a collection, responding with 201 and the new collection', () => {
        const newCollection = {
          title: 'test title',
          notes: 'test notes'
        };
        return supertest(app)
          .post('/api/collections')
          .send(newCollection)
          .expect(201)
          .expect(res => {
            expect(res.body).to.have.property('id');
            expect(res.body.title).to.eql(newCollection.title);
            expect(res.body.notes).to.eql(newCollection.notes);
          });
      });
    });

    describe(`GET /api/collections/:collection_id`, () => {
      context('Given there are collections in the database', () => {
        const testCollections = makeCollectionsArray();
        beforeEach('insert collections', () => {
          return db.into('collections').insert(testCollections);
        });

        it('responds with 200 and the specified collection', () => {
          const collectionId = 2;
          return supertest(app)
            .get(`/api/collections/${collectionId}`)
            .expect(200);
        });
      });
    });
  });
});
