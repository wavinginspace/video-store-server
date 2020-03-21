const xss = require('xss');

const CollectionsService = {
  getAllCollections(knex) {
    let collections = knex.select('*').from('collections');
    return collections;
  },
  insertCollection(knex, newCollection) {
    return knex
      .insert(newCollection)
      .into('collections')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  // * GET collections/:collection_id
  getById(knex, id) {
    return knex.raw(`SELECT
    films.id AS film_id,
    films.title AS film_title,
    collections.id,
    collections.title AS collection_title,
    collections.notes AS collection_notes
  FROM
    films
    FULL OUTER JOIN
    film_collections 
    ON films.id = film_collections.film_id
    FULL OUTER JOIN
    collections
    ON film_collections.collection_id = collections.id
    WHERE collections.id = ${id}`);
  },
  // * DELETE
  deleteCollection(knex, id) {
    return knex('collections')
      .where({ id })
      .delete();
  },
  // * PATCH
  updateCollection(knex, id, newCollectionFields) {
    return knex('collections')
      .where({ id })
      .update(newCollectionFields);
  },

  serializeCollection(collection) {
    let id = null;
    if (collection) {
      id = collection.id;
    }
    let { films } = collection;
    let title = collection.title;
    let notes = collection.notes;
    
    if (Array.isArray(collection) && collection.length) {
      id = collection[0].id;
      title = collection[0].collection_title;
      notes = collection[0].collection_notes;
      films = collection.map(film => {
        return { id: xss(film.film_id), title: xss(film.film_title) };
      });
    }

    return {
      id: id || null,
      title: xss(title),
      notes: xss(notes),
      collection_films: films
    };
  }
};

module.exports = CollectionsService;
