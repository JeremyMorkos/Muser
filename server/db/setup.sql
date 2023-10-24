DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS songs CASCADE;
DROP TABLE IF EXISTS friends CASCADE;

CREATE TABLE users (
id SERIAL PRIMARY KEY,
email VARCHAR (254) NOT NULL UNIQUE,
display_name VARCHAR (254) NOT NULL UNIQUE,
bio TEXT,
password_hash TEXT NOT NULL
);

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  spotify_id VARCHAR(254) NOT NULL,
  artist VARCHAR(254) NOT NULL, 
  song_name VARCHAR(254) NOT NULL, 
  album_img TEXT NOT NULL, 
  user_id INT,
  
  CONSTRAINT fk_songs_users
    FOREIGN KEY(user_id)
    REFERENCES users(id)
);

CREATE TABLE friends (
  id SERIAL PRIMARY KEY,
  friend_id INT,
  user_id INT,
  
  CONSTRAINT fk_friends_users
    FOREIGN KEY(user_id)
    REFERENCES users(id) ON DELETE CASCADE,

  CONSTRAINT fk_friends_users_2
    FOREIGN KEY(friend_id)
    REFERENCES users(id) ON DELETE CASCADE
);  


TRUNCATE TABLE users CASCADE;
TRUNCATE TABLE songs CASCADE;
TRUNCATE TABLE friends CASCADE;

ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE songs_id_seq RESTART WITH 1;
ALTER SEQUENCE friends_id_seq RESTART WITH 1;



