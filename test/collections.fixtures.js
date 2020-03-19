function makeCollectionsArray() {
  return [
    {
      id: 1,
      title: '80s Horror',
      notes: 'A collection of my favorite horror films.'
    },
    {
      id: 2,
      title: 'Comedy',
      notes: 'A collection of films that I think are funny.'
    },
    {
      id: 3,
      title: 'Action',
      notes: 'A collection of Action films.'
    },
    {
      id: 4,
      title: 'Sci-Fi',
      notes: 'A collections of Sci-Fi films.'
    }
  ];
}

function makeMaliciousCollection() {
  const maliciousCollection = {
    id: 911,
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    notes:'Bad image <img src="badimg.jpg" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.'
  };

  const expectedCollection = {
    ...maliciousCollection,
    title: 'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    notes: 'Bad image <img src>. But not <strong>all</strong> bad.'
  };

  return {
    maliciousCollection,
    expectedCollection
  };
}

module.exports = { makeCollectionsArray, makeMaliciousCollection };
