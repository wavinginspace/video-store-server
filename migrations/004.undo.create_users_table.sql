ALTER TABLE collections
  DROP COLUMN IF EXISTS user_id;

ALTER TABLE films
  DROP COLUMN IF EXISTS user_id;

  ALTER TABLE film_collections
  DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS users;