function makeFilmsArray() {
  return [
    {
      id: 1,
      selected_collections: '',
      title: 'Last House On The Left',
      director: 'Wes Craven',
      writers: 'Wes Craven',
      stars: 'Sandra Peabody, Lucy Grantham',
      year_released: '1972',
      genre: 'Horror',
      film_format: 'VHS',
      film_version: 'Original',
      film_condition: 'Decent',
      film_value: '$15',
      film_rating: '8/10',
      selling: 'true',
      trailer: 'https://www.youtube.com/watch?v=n_HUvEpwL1I',
      tags: 'Camp, B-Horror',
      notes: 'classic Wes Craven horror',
      memorable_scenes: 'when that thing happens',
      date_added: new Date('2020-03-18').toUTCString()
    },
    {
      id: 2,
      selected_collections: '',
      title: 'Halloween',
      director: 'John Carpenter',
      writers: 'John Carpenter, Debra Hill',
      stars: 'Jamie Lee Curtis, Donald Pleasance',
      year_released: '1981',
      genre: 'Horror',
      film_format: 'Blu-ray',
      film_version: "Director's Cut",
      film_condition: 'Excellent',
      film_value: '$10',
      film_rating: '10/10',
      selling: 'true',
      trailer: 'https://www.youtube.com/watch?v=T5ke9IPTIJQ&t=33s',
      tags: 'Classic, Teen Horror',
      notes: 'One of the best horror films ever made.',
      memorable_scenes:
        'When Jamie Lee Curtis turns around and Michael Myers side steps into the bushes.',
      date_added: new Date('2020-03-18').toUTCString()
    },
    {
      id: 3,
      selected_collections: '',
      title: 'Forrest Gump',
      director: 'Robert Zemeckis',
      writers: 'Winston Groom, Eric Roth',
      stars: 'Tom Hanks, Robin Wright, Gary Sinise',
      year_released: '1994',
      genre: 'Drama, Comedy, Romance',
      film_format: 'DVD',
      film_version: 'Original',
      film_condition: 'Good',
      film_value: '$1',
      film_rating: '7/10',
      selling: 'true',
      trailer: 'https://www.youtube.com/watch?v=bLvqoHBptjg',
      tags: 'American Classic, Feel-good',
      notes: 'Classic American cinema',
      memorable_scenes: 'Ping pong championship.',
      date_added: new Date('2020-03-18').toUTCString()
    }
  ];
}

function makeMaliciousFilm() {
  const maliciousFilm = {
    id: 911,
    selected_collections: '',
    title: 'Forrest Gump',
    director: 'Robert Zemeckis',
    writers: 'Winston Groom, Eric Roth',
    stars: 'Tom Hanks, Robin Wright, Gary Sinise',
    year_released: '1994',
    genre: 'Drama, Comedy, Romance',
    film_format: 'DVD',
    film_version: 'Original',
    film_condition: 'Good',
    film_value: '$1',
    film_rating: '7/10',
    selling: 'true',
    trailer: 'https://www.youtube.com/watch?v=bLvqoHBptjg',
    tags: 'Naughty naughty very naughty <script>alert("xss");</script>',
    notes:
      'Bad image <img src="badimg.jpg" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.',
    date_added: new Date('2020-03-18').toUTCString()
  };

  const expectedFilm = {
    ...maliciousFilm,
    tags:
      'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    notes: 'Bad image <img src>. But not <strong>all</strong> bad.'
  };

  return {
    maliciousFilm,
    expectedFilm
  };
}

module.exports = {
  makeFilmsArray,
  makeMaliciousFilm
};
