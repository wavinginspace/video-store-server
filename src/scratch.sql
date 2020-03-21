-- SELECT
--       films.id AS film_id,
--       films.title AS film_title,
--       collections.title AS collection_title,
--       collections.notes AS collection_notes
--       FROM
--       films
--       RIGHT JOIN
--       film_collections 
--       ON films.id = film_collections.film_id
--       RIGHT JOIN
--       collections
--       ON film_collections.collection_id = collections.id
--       WHERE collections.id = 1;

SELECT
      films.id AS film_id,
      films.title AS film_title,
      collections.id,
      collections.title AS collection_title,
      collections.notes AS collection_notes
    FROM
      films
      LEFT JOIN
      film_collections 
      ON films.id = film_collections.film_id
      LEFT JOIN
      collections
      ON film_collections.collection_id = collections.id
      WHERE collections.id = 3;