const xss = require('xss');

const FilmsService = {
  getAllFilms(knex) {
    let films = knex.select('*').from('films');
    return films;
  },
  insertFilm(knex, newFilm) {
    return knex
      .insert(newFilm)
      .into('films')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  // * GET bookmarks/:id
  getById(knex, id) {
    return knex
      .from('films')
      .select('*')
      .where({ id })
      .first();
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
    return {
    id: film.id,
    title: xss(film.title),
    selected_collection: xss(film.selected_collection),
    director: xss(film.director),
    writers: xss(film.writers),
    stars: xss(film.stars),
    year_released: film.year_released,
    genre: xss(film.genre),
    film_format: xss(film.film_format),
    film_version: xss(film.film_version),
    film_condition: xss(film.film_condition),
    film_value: xss(film.film_value),
    film_rating: xss(film.film_rating),
    selling: xss(film.selling),
    last_watched: film.last_watched,
    trailer: xss(film.trailer),
    tags: xss(film.tags),
    notes: xss(film.notes),
    memorable_scenes: xss(film.memorable_scenes),
    date_added: film.date_added
    }
  }
};

module.exports = FilmsService;
