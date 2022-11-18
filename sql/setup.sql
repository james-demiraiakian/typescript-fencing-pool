-- Use this file to define your SQL tables.
-- The SQL in this file will be executed when you run `npm run setup-db`.

DROP TABLE IF EXISTS users;


CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  club_id INT,
  owner BOOLEAN
);

