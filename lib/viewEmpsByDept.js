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
 * runs query to display total employee count in each department
 */
function viewEmpsByDept() {
  //imports startPrompts function to loop back to prompting the user for what they want to do next after this function is complete
  const startPrompts = require('./InitPrompt.js');
  db.query(
    `SELECT 
    department.name AS Department, 
    count(employee.id) AS "Dept Employee Count"
    FROM employee 
    JOIN role ON employee.role_id = role.id 
    JOIN department ON role.department_id = department.id
    GROUP BY department.name
   `,
    (err, results) => {
      console.log('');
      console.table(results);
      console.log('');

      startPrompts();
    }
  );
}
module.exports = viewEmpsByDept;
