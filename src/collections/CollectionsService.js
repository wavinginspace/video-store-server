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
      collections.title AS collection_title,
      collections.notes AS collection_notes
    FROM
      films
      JOIN
      film_collections 
      ON films.id = film_collections.film_id
      JOIN
      collections
      ON film_collections.collection_id = collections.id
      WHERE collections.id = ${id}`);
    // .then (rows => rows)
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
    
    let collectionFilms;
    let collectionTitle;
    let collectionNotes;

    if (collection.rows) {
      collectionTitle = collection.rows.length ? collection.rows[0].collection_title : collection.title;
      collectionNotes = collection.rows.length ? collection.rows[0].collection_notes : collection.notes;
      collectionFilms = collection.rows.map(film => {
        return { id: film.film_id, title: film.film_title };
      })
    }

    return {
      id: collection.id,
      title: collection.rows ? xss(collectionTitle) : collection.title,
      notes: collection.rows ? xss(collectionNotes) : collection.notes,
      collection_films: collectionFilms ? collectionFilms : ''
    };
  }
};

module.exports = CollectionsService;
