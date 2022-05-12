// add dependencies
const sql = require('mysql2');

// open connection to sql server
const db = sql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pass',
  database: 'employees_db',
});

function viewAllEmps() {
  const init = require('./InitPrompt.js');

  db.query(
    `SELECT employee.id AS ID, 
    employee.first_name AS "First Name", 
    employee.last_name AS "Last Name", 
    role.title AS Title, 
    department.name AS Department, 
    role.salary AS Salary, 
    employee.manager_id as Manager 
    FROM employee 
    JOIN role ON employee.role_id = role.id 
    JOIN department ON role.department_id = department.id
    ORDER BY ID`,
    (err, results) => {
      if (err) {
        console.error(err);
        init();
      } else {
        console.log('');
        console.table(results);
        console.log('');
        init();
      }
    }
  );
}
module.exports = viewAllEmps;
