BEGIN;

TRUNCATE
  films,
  collections,
  film_collections
  RESTART IDENTITY CASCADE;

INSERT INTO films (
  title, 
  director,
  writers,
  stars,
  year_released,
  genre,
  film_format,
  film_version,
  film_condition,
  film_value,
  film_rating,
  selling,
  last_watched,
  trailer,
  tags,
  notes,
  memorable_scenes
      ) 
VALUES
('Last House On The Left', 
'Wes Craven', 
'Wes Craven', 
'Sandra Peabody, Lucy Grantham', 
'1972', 
'Horror', 
'VHS', 
'Original', 
'Decent', 
'$15', 
'8/10', 
'true', 
'2015-12-31', 
'https://www.youtube.com/watch?v=n_HUvEpwL1I', 
'Camp, B-Horror', 
'Classic Wes Craven horror', 
'can''t remember any'
),
('Halloween', 'John Carpenter', 'John Carpenter, Debra Hill', 'Jamie Lee Curtis, Donald Pleasance', '1981', 'Horror', 'Blu-ray', 'Director''s Cut', 'Excellent', '$10', '10/10', 'false', '2020-03-01', 'https://www.youtube.com/watch?v=T5ke9IPTIJQ&t=33s', 'Classic, Teen Horror', 'One of the best horror films ever made.', 'When Jamie Lee Curtis turns around and Michael Myers side steps into the bushes.'),
('Forrest Gump', 'Robert Zemeckis', 'Winston Groom, Eric Roth', 'Tom Hanks, Robin Wright, Gary Sinise', '1994', 'Drama, Comedy, Romance', 'DVD', 'Original', 'Good', '$1', '7/10', 'true', '2020-01-01', 'https://www.youtube.com/watch?v=bLvqoHBptjg', 'American Classic, Feel-good', 'Classic American cinema', 'Ping pong championship.');


INSERT INTO collections (title, notes) 
VALUES
('80s Horror', 'A collection of my favorite horror films.'),
('Comedy', 'A collection of films that I think are funny.');

INSERT INTO film_collections (film_id, collection_id)
VALUES
(1, 1),
(2, 1),
(3, 2);

COMMIT;