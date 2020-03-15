const express = require('express');
const path = require('path');
const FilmsService = require('./FilmsService');

const logger = require('../logger');
const filmsRouter = express.Router();
const jsonParser = express.json();

filmsRouter
  .route('/')
  .get((req, res, next) => {
    FilmsService.getAllFilms(req.app.get('db'))
      .then(films => {
        console.log(films);
        res.json(films.map(FilmsService.serializeFilm));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const {
      title,
      selected_collections,
      director,
      writers,
      stars,
      year_released,
      genre,
      film_format,
      film_version,
      film_condition,
      film_value,
      film_rating,
      selling,
      trailer,
      tags,
      notes,
      memorable_scenes,
      date_added
    } = req.body;

    const newFilm = {
      title,
      selected_collections,
      director,
      writers,
      stars,
      year_released,
      genre,
      film_format,
      film_version,
      film_condition,
      film_value,
      film_rating,
      selling,
      trailer,
      tags,
      notes,
      memorable_scenes,
      date_added
    };

    console.log(req.body);
    console.log(newFilm);
    // for (const [key, value] of Object.entries(newFilm))
    //   if (value == null)
    //     return res.status(400).json({
    //       error: { message: `Missing '${key}' in request body` }
    //     });

    FilmsService.insertFilm(req.app.get('db'), newFilm)
      .then(film => {
        logger.info(`Film with id of ${film.id} was created`);
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${film.id}`))
          .json(FilmsService.serializeFilm(film));
      })
      .catch(next);
  });

filmsRouter
  .route('/:film_id')
  .all(checkFilmExists)
  .get((req, res) => {
    res.json(FilmsService.serializeFilm(res.film));
  })
  .delete((req, res, next) => {
    const { film_id } = req.params;
    FilmsService.deleteFilm(req.app.get('db'), film_id)
      .then(numRowsAffected => {
        logger.info(`Film with id ${film_id} deleted.`);
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { title } = req.body;
    const filmToUpdate = { title };

    const numberOfValues = Object.values(filmToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'title', 'url', 'description', or 'rating'`
        }
      });
    }

    res.status(204).end();
    FilmsService.updateFilm(req.app.get('db'), req.params.film_id, filmToUpdate)
      .then(numRowsAffected => {
        logger.info(`Film with id ${film_id} updated.`);
        res.status(204).end();
      })
      .catch(next);
  });

async function checkFilmExists(req, res, next) {
  try {
    const film = await FilmsService.getById(
      req.app.get('db'),
      req.params.film_id
    );

    if (!film)
      return res.status(404).json({
        error: `Film doesn't exist`
      });

    res.film = film;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = filmsRouter;
