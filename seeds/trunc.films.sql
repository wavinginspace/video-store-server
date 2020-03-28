BEGIN;

TRUNCATE
  films,
  collections,
  film_collections,
  users
  RESTART IDENTITY CASCADE;

  COMMIT;