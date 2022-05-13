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
  const startPrompts = require('./InitPrompt.js');

  db.query(
    `SELECT employee.id AS ID, 
    employee.first_name AS "First Name", 
    employee.last_name AS "Last Name", 
    role.title AS Title, 
    department.name AS Department, 
    role.salary AS Salary, 
    CONCAT (manager.first_name, ' ', manager.last_name) AS Manager
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id 
    ORDER BY ID`,
    (err, results) => {
      if (err) {
        console.error(err);
        startPrompts();
      } else {
        console.log('');
        console.table(results);
        console.log('');
        startPrompts();
      }
    }
  );
}
module.exports = viewAllEmps;
