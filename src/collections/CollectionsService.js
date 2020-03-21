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
      LEFT JOIN
      film_collections 
      ON films.id = film_collections.film_id
      LEFT JOIN
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
    let collectionFilms, collectionTitle, collectionNotes;

    if (Array.isArray(collection)) {
      collectionId = collection[0].id;
      collectionTitle = collection[0].collection_title;
      collectionNotes = collection[0].collection_notes;
      collectionFilms = collection.map(film => {
        return { id: film.film_id, title: film.film_title };
      });
    }

    return {
      id: collectionId,
      title: xss(collectionTitle),
      notes: xss(collectionNotes),
      collection_films: collectionFilms
    };
  }
};

module.exports = CollectionsService;
