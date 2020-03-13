BEGIN;

TRUNCATE
  films,
  collections,
  collection_films
  RESTART IDENTITY CASCADE;

INSERT INTO films (title, collections, director, writers, stars) 
VALUES
('Last House On The Left', 'Horror'),
('Psycho'),
('Halloween'),
('The Fog')

COMMIT;