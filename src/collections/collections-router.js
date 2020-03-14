const express = require('express');
const path = require('path');
const CollectionsService = require('./CollectionsService');

const logger = require('../logger');
const collectionsRouter = express.Router();
const jsonParser = express.json();

collectionsRouter
  .route('/')
  .get((req, res, next) => {
    CollectionsService.getAllCollections(req.app.get('db'))
      .then(collections => {
        console.log(collections);
        res.json(collections.map(CollectionsService.serializeCollection));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { title, notes } = req.body;
    const newCollection = { title, notes };

console.log(newCollection)
    for (const [key, value] of Object.entries(newCollection))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });

    CollectionsService.insertCollection(req.app.get('db'), newCollection)
      .then(collection => {
        logger.info(`Collection with id of ${collection.id} was created`);
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${collection.id}`))
          .json(CollectionsService.serializeCollection(collection));
      })
      .catch(next);
  });

collectionsRouter
  .route('/:collection_id')
  .all(checkCollectionExists)
  .get((req, res) => {
    res.json(CollectionsService.serializeCollection(res.collection))
    .then(console.log(res.collection));
  })
  .delete((req, res, next) => {
    const { collection_id } = req.params;
    CollectionsService.deleteCollection(req.app.get('db'), collection_id)
      .then(numRowsAffected => {
        logger.info(`Collection with id ${collection_id} deleted.`);
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { title, notes } = req.body;
    const collectionToUpdate = { title, notes };

    const numberOfValues = Object.values(collectionToUpdate).filter(Boolean)
      .length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'title', 'url', 'description', or 'rating'`
        }
      });
    }

    res.status(204).end();
    CollectionsService.updateCollection(
      req.app.get('db'),
      req.params.collection_id,
      collectionToUpdate
    )
      .then((numRowsAffected) => {
        logger.info(`Collection with id ${collection_id} updated.`)
        res.status(204).end();
      })
      .catch(next);
  })


async function checkCollectionExists(req, res, next) {
  try {
    const collection = await CollectionsService.getById(
      req.app.get('db'),
      req.params.collection_id
    );

    if (!collection)
      return res.status(404).json({
        error: `Collection doesn't exist`
      });

    res.collection = collection;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = collectionsRouter;
