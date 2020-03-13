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
    return knex
      .from('collections')
      .select('*')
      .where({ id })
      .first();
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
    return {
      id: collection.id,
      title: xss(collection.title),
      notes: xss(collection.notes)
    };
  }
};

module.exports = CollectionsService;
