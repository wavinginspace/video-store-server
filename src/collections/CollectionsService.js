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
  // getById(knex, id) {
  //   return knex
  //     .from('collections')
  //     .select('*')
  //     .where({ id })
  //     .first();
  // },
  getById(knex, id) {
    return knex
      .raw(`SELECT
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
      WHERE collections.id = ${id}`)
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

  // TODO FIX THiS --> /collections endpoint not working

  serializeCollection(collection) {

    let collectionFilms;

    if (collection.rows) {
    const collectionTitle = collection.rows[0].collection_title
    const collectionNotes =  collection.rows[0].collection_notes;
    collectionFilms = collection.rows.map(film => film.film_title)
    }

    console.log(collection)
    return {
      id: collection.id,
      title: collection.rows ? xss(collectionTitle) : collection.title,
      notes: collection.rows ? xss(collectionNotes) : collection.notes,
      collection_films: collectionFilms ? collectionFilms : ''
    };
  }
};

module.exports = CollectionsService;
