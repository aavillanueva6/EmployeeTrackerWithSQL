// add dependencies
const sql = require('mysql2');

// add db connection
const db = require('../config/connection');

// runs query to display total employee count by manager
function viewAllEmps() {
  //imports startPrompts function to loop back to prompting the user for what they want to do next after this function is complete
  const startPrompts = require('./InitPrompt.js');

  db.query(
    `SELECT CONCAT (manager.first_name, ' ', manager.last_name) AS Manager, 
    count(employee.id) AS "Manager Employee Count"
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id
    JOIN employee AS manager ON employee.manager_id = manager.id 
    GROUP BY manager.first_name`,
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
