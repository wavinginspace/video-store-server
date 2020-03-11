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
    const { title } = req.body;
    const newFilm = { title };
console.log(newFilm)
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
