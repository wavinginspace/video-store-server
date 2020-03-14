CREATE TABLE film_collections (
  film_id INTEGER REFERENCES films(id) ON DELETE CASCADE NOT NULL,
  collection_id INTEGER REFERENCES collections(id),
  PRIMARY KEY (film_id, collection_id)
);