// add dependencies
const sql = require('mysql2');

// open connection to sql server
const db = sql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pass',
  database: 'employees_db',
});

function init() {
  db.query(`SELECT * FROM department`, (err, results) => {
    console.log(results);
    const init = require('./InitPrompt.js');
    init();
  });
}
module.exports = init;
