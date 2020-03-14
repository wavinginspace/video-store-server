CREATE TABLE film_collections (
  film_id INTEGER REFERENCES films(id) ON DELETE CASCADE,
  collection_id INTEGER REFERENCES collections(id) ON DELETE CASCADE,
  PRIMARY KEY (film_id, collection_id)
);