const xss = require('xss');

const FilmsService = {
  getAllFilms(knex) {
    let films = knex.select('*').from('films');
    return films;
  },
  insertFilm(knex, newFilm) {
    const selected_collections = newFilm.selected_collections;
    newFilm.selected_collections = '';
    let film;

    return knex
      .transaction(function(t) {
        return knex('films')
          .transacting(t)
          .insert(newFilm)
          .returning('*')
          .then(function(response) {
            film = response[0]; // response = data from database
            let collections = selected_collections.map(collection => {
              return { film_id: film.id, collection_id: collection };
            });

            return knex('film_collections')
              .transacting(t)
              .insert(collections);
          })
          .then(t.commit)
          .catch(t.rollback);
      })
      .then(function() {
        // transaction suceeded, data written
        return film;
      })
      .catch(function(e) {
        // transaction failed, data rolled back
      });
  },
  // * GET films/:id
  getById(knex, id) {
    return knex
      .from('films')
      .select('films.*', 'collections.title AS collection_title')
      .where({ 'films.id': id })
      .leftOuterJoin(
        'film_collections',
        'films.id',
        '=',
        'film_collections.film_id'
      )
      .leftOuterJoin(
        'collections',
        'film_collections.collection_id',
        '=',
        'collections.id'
      )
      .leftOuterJoin('users', 'films.user_id', '=', 'users.user_id');
  },
  // * DELETE
  deleteFilm(knex, id) {
    return knex('films')
      .where({ id })
      .delete();
  },
  // * PATCH
  updateFilm(knex, id, newFilmFields) {
    return knex('films')
      .where({ id })
      .update(newFilmFields);
  },

  serializeFilm(film) {
    let collections;

    if (Array.isArray(film)) {
      collections = film.map(film => film.collection_title);
      film = film[0];
    }
    return {
      id: film.id,
      title: xss(film.title),
      selected_collections: xss(film.selected_collections),
      director: xss(film.director),
      writers: xss(film.writers),
      stars: xss(film.stars),
      year_released: xss(film.year_released),
      genre: xss(film.genre),
      film_format: xss(film.film_format),
      film_version: xss(film.film_version),
      film_condition: xss(film.film_condition),
      film_value: xss(film.film_value),
      film_rating: xss(film.film_rating),
      selling: xss(film.selling),
      trailer: xss(film.trailer),
      tags: xss(film.tags),
      notes: xss(film.notes),
      memorable_scenes: xss(film.memorable_scenes),
      date_added: xss(film.date_added),
      collections: xss(collections)
    };
  }
};

module.exports = FilmsService;
