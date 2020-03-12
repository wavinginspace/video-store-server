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
    title: xss(film.title)
    }
  }
};

module.exports = FilmsService;
