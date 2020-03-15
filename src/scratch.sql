-- SELECT
--   films.title,
--   collections.title
-- FROM
--   films
--   JOIN
--   film_collections 
--   ON films.id = film_collections.film_id
--   JOIN
--   collections
--   ON film_collections.collection_id = collections.id
--   WHERE collections.id = 1;

-- WITH ins1 AS (
-- INSERT INTO films (
--   title,
--   collections,
--   director,
--   writers,
--   stars,
--   year_released,
--   genre,
--   film_format,
--   film_version,
--   film_condition,
--   film_value,
--   film_rating,
--   selling,
--   last_watched,
--   trailer,
--   tags,
--   notes,
--   memorable_scenes
--       ) 
-- VALUES
-- ('Halloween 6',
-- '80s Horror',
-- 'Paul Jones', 
-- 'Paul Jones', 
-- 'The Writers', 
-- '1984', 
-- 'Classic Horror', 
-- 'VHS', 
-- 'Original', 
-- 'Decent', 
-- '$15', 
-- '9/10', 
-- 'true', 
-- '2015-12-31', 
-- 'https://www.youtube.com/watch?v=n_HUvEpwL1I', 
-- 'Camp, B-Horror', 
-- 'Classic Paul Jones horror', 
-- 'when the killer shows up'
-- )
-- RETURNING id AS film_id, collections
-- ),
-- ins2 AS (
--   INSERT INTO film_collections (film_id, collection_id)
--   VALUES ((SELECT film_id FROM ins1), 1)
--   RETURNING film_id, collection_id
-- )
-- INSERT INTO film_collections (film_id, collection_id)
-- VALUES ( (SELECT film_id FROM ins1), 1);


-- SELECT collections.id, collections.title FROM collections
--     JOIN film_collections
--     ON collections.id = film_collections.collection_id
--     WHERE collections.id = 1


-- SELECT
--       films.id AS film_id,
--       films.title AS film_title,
--       collections.title AS collection_title,
--       collections.notes AS collection_notes
--     FROM
--       films
--       JOIN
--       film_collections 
--       ON films.id = film_collections.film_id
--       JOIN
--       collections
--       ON film_collections.collection_id = collections.id
--       WHERE collections.id = 1;


-- WITH ins1 AS (
-- INSERT INTO films (
--   title,
--   collections,
--   director,
--   writers,
--   stars,
--   year_released,
--   genre,
--   film_format,
--   film_version,
--   film_condition,
--   film_value,
--   film_rating,
--   selling,
--   last_watched,
--   trailer,
--   tags,
--   notes,
--   memorable_scenes
--       ) 
-- VALUES
-- ('Halloween 6',
-- '80s Horror',
-- 'Paul Jones', 
-- 'Paul Jones', 
-- 'The Writers', 
-- '1984', 
-- 'Classic Horror', 
-- 'VHS', 
-- 'Original', 
-- 'Decent', 
-- '$15', 
-- '9/10', 
-- 'true', 
-- '2015-12-31', 
-- 'https://www.youtube.com/watch?v=n_HUvEpwL1I', 
-- 'Camp, B-Horror', 
-- 'Classic Paul Jones horror', 
-- 'when the killer shows up'
-- )
-- RETURNING id AS film_id, collections;
-- ),
-- selected_collection AS (
--   SELECT film_id, collections
--   FROM 
--   ins1
--   JOIN 
--   films
--   ON films.collections = ins1.collections
--   JOIN
--   collections
--   ON ins1.collections = collections.title
-- )




 SELECT films.id, collections, collections.id
  FROM films
  JOIN
  collections
  ON films.collections = collections.title
  JOIN 
  film_collections
  ON film_collections.film_id = films.id
  AND film_collections.collection_id = collections.id;