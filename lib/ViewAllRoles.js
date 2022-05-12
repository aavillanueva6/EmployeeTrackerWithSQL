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
  db.query(
    `SELECT role.id AS ID, role.title AS Title, role.salary AS Salary, department.name AS Department FROM role JOIN department ON role.department_id = department.id`,
    (err, results) => {
      console.table(results);
      const init = require('./InitPrompt.js');
      init();
    }
  );
}
module.exports = init;
