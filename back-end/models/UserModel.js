const { Pool } = require('pg');

const connectionString =
  'postgres://fqslfsxx:0zJzt8o_bIJGff2Rk-wj9ud7syByD1-a@ruby.db.elephantsql.com/fqslfsxx';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString,
});

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
