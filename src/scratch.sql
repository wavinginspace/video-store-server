SELECT
      films.id AS film_id,
      films.title AS film_title,
      collections.id,
      collections.title AS collection_title,
      collections.notes AS collection_notes
    FROM
      films
      FULL OUTER JOIN
      film_collections 
      ON films.id = film_collections.film_id
      FULL OUTER JOIN
      collections
      ON film_collections.collection_id = collections.id;
