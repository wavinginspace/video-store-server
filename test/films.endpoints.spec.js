const knex = require('knex');
const app = require('../src/app');
const { makeFilmsArray, makeMaliciousFilm } = require('./films.fixtures');
// const { makeCollectionsArray } = require('./collections.fixtures');

describe('Films Endpoints', function() {
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

  // * TEST GET /FILMS

  describe('GET /api/films', () => {
    context('Given no films', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/films')
          .expect(200, []);
      });
    });
  });

  context('Given films in the database', () => {
    // const testCollections = makeCollectionsArray();
    const testFilms = makeFilmsArray();

    beforeEach('insert films', () => {
      return db.into('films').insert(testFilms);
    });

    it('responds with 200 and all films', () => {
      // let today = new Date("2020-03-18").toUTCString()

      let databaseFilms = testFilms.map(film => {
        return {
          ...film,
          collections: '',
          date_added: new Date('2020-03-18 00:00:00').toString()
        };
      });
      return supertest(app)
        .get('/api/films')
        .expect(200, databaseFilms);
    });
  });

  // * TEST XSS ATTACK

  context('Given an XSS attack film', () => {
    const testFilms = makeFilmsArray();
    const { maliciousFilm, expectedFilm } = makeMaliciousFilm();

    beforeEach('insert malicious film', () => {
      return db.into('films').insert([maliciousFilm]);
    });

    it('removes XSS attack content', () => {
      return supertest(app)
        .get('/api/films')
        .expect(200)
        .expect(res => {
          expect(res.body[0].tags).to.eql(expectedFilm.tags);
          expect(res.body[0].films).to.eql(expectedFilm.films);
        });
    });
  });

  // * TEST DELETE FILM

  context('Given films in the database', () => {
    // const testCollections = makeCollectionsArray();
    const testFilms = makeFilmsArray();

    beforeEach('insert films', () => {
      return db.into('films').insert(testFilms);
    });

    it('responds with 204 and removes the film', () => {
      let databaseFilms = testFilms.map(film => {
        return {
          ...film,
          collections: '',
          date_added: new Date('2020-03-18 00:00:00').toString()
        };
      });
      const idToRemove = 2;
      const expectedFilms = databaseFilms.filter(
        film => film.id !== idToRemove
      );
      return supertest(app)
        .delete(`/api/films/${idToRemove}`)
        .expect(204)
        .then(res => {
          return supertest(app)
            .get('/api/films')
            .expect(expectedFilms);
        });
    });
  });

  describe('POST /api/films', () => {
    it('creates a film, responding with 201 and the new film', () => {
      const newFilm = {
        title: 'Forrest Gump',
        selected_collections: [],
        director: 'Robert Zemeckis',
        writers: 'Winston Groom, Eric Roth',
        stars: 'Tom Hanks, Robin Wright, Gary Sinise',
        year_released: '1994',
        genre: 'Drama, Comedy, Romance',
        film_format: 'DVD',
        film_version: 'Original',
        film_condition: 'Good',
        film_value: '$1',
        film_rating: '7/10',
        selling: 'true',
        trailer: 'https://www.youtube.com/watch?v=bLvqoHBptjg',
        tags: 'American Classic, Feel-good',
        notes: 'Classic American cinema',
        memorable_scenes: 'Ping pong championship.',
        date_added: new Date('2020-03-18 00:00:00').toISOString()
      };
      return supertest(app)
        .post('/api/films')
        .send(newFilm)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('selected_collections');
          expect(res.body.director).to.eql(newFilm.director);
          expect(res.body.writers).to.eql(newFilm.writers);
          expect(res.body.stars).to.eql(newFilm.stars);
          expect(res.body.year_released).to.eql(newFilm.year_released);
          expect(res.body.genre).to.eql(newFilm.genre);
          expect(res.body.film_format).to.eql(newFilm.film_format);
          expect(res.body.film_version).to.eql(newFilm.film_version);
          expect(res.body.film_condition).to.eql(newFilm.film_condition);
          expect(res.body.film_value).to.eql(newFilm.film_value);
          expect(res.body.film_rating).to.eql(newFilm.film_rating);
          expect(res.body.selling).to.eql(newFilm.selling);
          expect(res.body.trailer).to.eql(newFilm.trailer);
          expect(res.body.tags).to.eql(newFilm.tags);
          expect(res.body.notes).to.eql(newFilm.notes);
          expect(res.body.memorable_scenes).to.eql(newFilm.memorable_scenes);
          const expected = new Intl.DateTimeFormat('en-US').format(new Date("03-18-2020"));
          const actual = new Intl.DateTimeFormat('en-US').format(
            new Date(res.body.date_added)
          );
          expect(actual).to.eql(expected);
        })
        .then(res => {
          
          return supertest(app)
            .get(`/api/films/${res.body.id}`)
            .expect(res.body);
        });
    });
  });
});

//   describe('GET /api/films', () => {
//     context('Given no films', () => {
//       it('responds with 200 and an empty list', () => {
//         return supertest(app)
//           .get('/api/films')
//           .expect(200, []);
//       });
//     });

//     context('Given films in the database', () => {
//       const testcollections = makecollectionsArray();
//       const testFilms = makefilmsArray();

//       beforeEach('insert films', () => {
//         return db
//           .into('collections')
//           .insert(testcollections)
//           .then(() => {
//             return db.into('films').insert(testFilms);
//           });
//       });

//       it('responds with 200 and all films', () => {
//         return supertest(app)
//           .get('/api/films')
//           .expect(200, testFilms);
//       });
//     });

//     context('Given an XSS attack film', () => {
//       const testcollections = makecollectionsArray();
//       const { maliciousfilm, expectedfilm } = makeMaliciousfilm();

//       beforeEach('insert malicious film', () => {
//         return db
//           .into('collections')
//           .insert(testcollections)
//           .then(() => {
//             return db.into('films').insert([maliciousfilm]);
//           });
//       });

//       it('removes XSS attack content', () => {
//         return supertest(app)
//           .get('/api/films')
//           .expect(200)
//           .expect(res => {
//             expect(res.body[0].film_name).to.eql(expectedfilm.film_name);
//             expect(res.body[0].content).to.eql(expectedfilm.content);
//           });
//       });
//     });
//   });

//   describe('POST /api/films', () => {
//     const testcollections = makecollectionsArray();
//     beforeEach('insert collections', () => {
//       return db.into('collections').insert(testcollections);
//     });

//     it('creates a film, responding with 201 and the new film', () => {
//       const newfilm = {
//         film_name: 'Test new film',
//         content: 'Test new film content...',
//         modified: new Date(),
//         folder: 2
//       };
//       return supertest(app)
//         .post('/api/films')
//         .send(newfilm)
//         .expect(201)
//         .expect(res => {
//           expect(res.body.film_name).to.eql(newfilm.film_name);
//           expect(res.body.content).to.eql(newfilm.content);
//           expect(res.body.folder).to.eql(newfilm.folder);
//           expect(res.body).to.have.property('id');
//           expect(res.headers.location).to.eql(`/api/films/${res.body.id}`);
//           const expected = new Intl.DateTimeFormat('en-US').format(new Date());
//           const actual = new Intl.DateTimeFormat('en-US').format(
//             new Date(res.body.modified)
//           );
//           expect(actual).to.eql(expected);
//         })
//         .then(res => {
//           return supertest(app)
//             .get(`/api/films/${res.body.id}`)
//             .expect(res.body);
//         });
//     });

//     const requiredFields = ['film_name', 'content'];

//     requiredFields.forEach(field => {
//       const newfilm = {
//         film_name: 'Test new film',
//         content: 'Test new film content',
//         modified: new Date(),
//         folder: 2
//       };

//       it(`responds with 400 and error when the '${field}' is missing`, () => {
//         delete newfilm[field];

//         return supertest(app)
//           .post('/api/films')
//           .send(newfilm)
//           .expect(400, {
//             error: {
//               message: `Missing '${field}' in request body`
//             }
//           });
//       });
//     });

//     it('removes XSS attack content from response', () => {
//       const { maliciousfilm, expectedfilm } = makeMaliciousfilm();
//       return supertest(app)
//         .post(`/api/films`)
//         .send(maliciousfilm)
//         .expect(201)
//         .expect(res => {
//           expect(res.body.film_name).to.eql(expectedfilm.film_name);
//           expect(res.body.content).to.eql(expectedfilm.content);
//         });
//     });
//   });

//   describe('DELETE /api/films/:film_id', () => {
//     context('Given no films', () => {
//       it('responds with 404', () => {
//         const filmId = 123456;
//         return supertest(app)
//           .delete(`/api/films/${filmId}`)
//           .expect(404, {
//             error: {
//               message: `film doesn't exist`
//             }
//           });
//       });
//     });

//     context('Given films in the database', () => {
//       const testcollections = makecollectionsArray();
//       const testFilms = makefilmsArray();

//       beforeEach('insert films', () => {
//         return db
//           .into('collections')
//           .insert(testcollections)
//           .then(() => {
//             return db.into('films').insert(testFilms);
//           });
//       });

//       it('responds with 204 and removes the film', () => {
//         const idToRemove = 2;
//         const expectedfilms = testFilms.filter(film => film.id !== idToRemove);
//         return supertest(app)
//           .delete(`/api/films/${idToRemove}`)
//           .expect(204)
//           .then(res => {
//             return supertest(app)
//               .get('/api/films')
//               .expect(expectedfilms);
//           });
//       });
//     });
//   });

//   describe('PATCH /api/films/:film_id', () => {
//     context('Given no films', () => {
//       it('responds with 404', () => {
//         const filmId = 123456;
//         return supertest(app)
//           .delete(`/api/films/${filmId}`)
//           .expect(404, { error: { message: `film doesn't exist` } });
//       });
//     });

//     context('Given films in the database', () => {
//       const testcollections = makecollectionsArray();
//       const testFilms = makefilmsArray();

//       beforeEach('insert films', () => {
//         return db
//           .into('collections')
//           .insert(testcollections)
//           .then(() => {
//             return db.into('films').insert(testFilms);
//           });
//       });

//       it('responds with 204 and updates the film', () => {
//         const idToUpdate = 2;
//         const updatefilm = {
//           film_name: 'updates film name',
//           content: 'updated film content'
//         };
//         const expectedfilm = {
//           ...testFilms[idToUpdate - 1],
//           ...updatefilm
//         };
//         return supertest(app)
//           .patch(`/api/films/${idToUpdate}`)
//           .send(updatefilm)
//           .expect(204)
//           .then(res => {
//             return supertest(app)
//               .get(`/api/films/${idToUpdate}`)
//               .expect(expectedfilm);
//           });
//       });

//       it('responds with 400 when no required fields supplied', () => {
//         const idToUpdate = 2;
//         return supertest(app)
//           .patch(`/api/films/${idToUpdate}`)
//           .send({ irrelevantField: 'foo' })
//           .expect(400, {
//             error: {
//               message: `Request body must contain either 'film name', 'content' or 'folder'`
//             }
//           });
//       });

//       it('responds with 204 when updating only a subset of fields', () => {
//         const idToUpdate = 2;
//         const updatefilm = {
//           folder: 3
//         };
//         const expectedfilm = {
//           ...testFilms[idToUpdate - 1],
//           ...updatefilm
//         };

//         return supertest(app)
//           .patch(`/api/films/${idToUpdate}`)
//           .send({
//             ...updatefilm,
//             fieldToIgnore: 'should not be in GET response'
//           })
//           .expect(204)
//           .then(res => {
//             return supertest(app)
//               .get(`/api/films/${idToUpdate}`)
//               .expect(expectedfilm);
//           });
//       });
//     });
//   });
// });
