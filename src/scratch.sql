SELECT
  films.title,
  collections.title
FROM
  films
  JOIN
  film_collections 
  ON films.id = film_collections.film_id
  JOIN
  collections
  ON film_collections.collection_id = collections.id
  WHERE collections.id = 1;

-- INSERT INTO 