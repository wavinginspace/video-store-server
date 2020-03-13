CREATE TABLE film_collection_sets (
  film_id INTEGER REFERENCES films(id),
  collection_id INTEGER REFERENCES collections(id),
  PRIMARY KEY (film_id, collection_id)
);