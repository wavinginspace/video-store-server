const app = require('./app');
const knex = require('knex');
const { PORT, DATABASE_URL } = require('./config');
const moment = require ('moment');
const { types } = require('pg');
const { builtins } = require('pg-types');

const parseFn = (val) => {
  return val === null ? null : moment(val).format('MM-DD-YYYY');
};

types.setTypeParser(builtins.DATE, parseFn);

const db = knex({
  client: 'pg',
  connection: DATABASE_URL
});

app.set('db', db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
