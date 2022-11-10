-- Use this file to define your SQL tables.
-- The SQL in this file will be executed when you run `npm run setup-db`.

DROP TABLE IF EXISTS users;


CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  club_id INT,
  owner BOOLEAN
);

INSERT INTO 
  users (name, email, password_hash, club_id, owner)
VALUES
  ('Fred Flonstine', 'f.f@stone.com', 'y49f3q2y592843y894d1yn8r9ytc29', '0206', true)