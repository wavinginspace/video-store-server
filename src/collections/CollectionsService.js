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
      collections.title AS collection_title
    FROM
      films
      JOIN
      film_collections 
      ON films.id = film_collections.film_id
      JOIN
      collections
      ON film_collections.collection_id = collections.id
      WHERE collections.id = ${id}`)
      // .then(collection => {
      //   return collection.rows[0];
      // });
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
    // const collectionFilms = collection.map(collection => collection.title)

    const collectionFilms = collection.rows.map(film => film.film_title)


    return {
      id: collection.id,
      title: xss(collection.title),
      notes: xss(collection.notes),
      collection: collectionFilms
    };
  }
};

module.exports = CollectionsService;
