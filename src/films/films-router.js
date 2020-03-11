const express = require('express');
const path = require('path');
const FilmsService = require('./films-service');

const filmsRouter = express.Router();
const jsonParser = express.json();

filmsRouter.route('/').get((req, res, next) => {
  FilmsService.getAllFilms(req.app.get('db'))
    .then(films => {
      console.log(films);
      res.json(films.map(FilmsService.serializeFilm));
    })
    .catch(next);
});
