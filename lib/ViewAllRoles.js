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
 * runs db query to display all roles and their relevant data
 */
function viewAllRoles() {
  //imports startPrompts function to loop back to prompting the user for what they want to do next after this function is complete
  const startPrompts = require('./InitPrompt.js');
  db.query(
    `SELECT role.id AS ID, 
    role.title AS Title, 
    role.salary AS Salary, 
    department.name AS Department 
    FROM role 
    LEFT JOIN department ON role.department_id = department.id
    ORDER BY ID`,
    (err, results) => {
      console.log('');
      console.table(results);
      console.log('');

      startPrompts();
    }
  );
}
module.exports = viewAllRoles;
