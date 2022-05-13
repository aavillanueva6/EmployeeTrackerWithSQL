// add dependencies
const sql = require('mysql2');

// open connection to sql server
const db = sql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pass',
  database: 'employees_db',
});

/**
 * executes db query to display all departments to user
 */
function viewDepts() {
  db.query(
    `SELECT id AS ID,
    name AS "Department Name"
    FROM department 
    ORDER BY ID`,
    (err, results) => {
      console.log('');
      console.table(results);
      console.log('');
      //imports startPrompts function to loop back to prompting the user for what they want to do next after this function is complete
      const startPrompts = require('./InitPrompt.js');
      startPrompts();
    }
  );
}
module.exports = viewDepts;
