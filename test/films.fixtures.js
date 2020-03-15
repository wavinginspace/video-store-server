function makeFilmsArray() {
  return [
    {
      id: 1,
      selected_collections: 'First Note',
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur',
      director: '2020-03-03T06:35:13.835Z',
      writers: 3,
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
      notes: 'classic Wes Craven horror!',
      memorable_scenes: `can't remember any`
    },
    {
      id: 2,
      note_name: 'Second Note',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, exercitationem',
      modified: '2020-03-02T06:35:13.835Z',
      folder: 1
    },
    {
      id: 3,
      note_name: 'Third Note',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate?',
      modified: '2020-01-03T06:35:13.835Z',
      folder: 2
    },
    {
      id: 4,
      note_name: 'Fourth Note',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum molestiae',
      modified: '2020-03-03T04:35:13.835Z',
      folder: 3
    }
  ];
}

'Last House On The Left',
'80s Horror',
'Wes Craven', 
'Wes Craven', 
'Sandra Peabody, Lucy Grantham', 
'1972', 
'80s Horror', 
'VHS', 
'Original', 
'Decent', 
'$15', 
'8/10', 
'true',  
'https://www.youtube.com/watch?v=n_HUvEpwL1I', 
'Camp, B-Horror', 
'Classic Wes Craven horror', 
'can''t remember any'






function makeMaliciousNote() {
  const maliciousNote = {
    id: 911,
    note_name: 'Naughty naughty very naughty <script>alert("xss");</script>',
    content: 'Bad image <img src="badimg.jpg" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.',
    modified: new Date().toISOString(),
    folder: 1
  };

  const expectedNote = {
    ...maliciousNote,
    note_name: 'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    content: 'Bad image <img src>. But not <strong>all</strong> bad.'
  }

  return {
    maliciousNote,
    expectedNote
  }
}

module.exports = {
  makeNotesArray,
  makeMaliciousNote
}