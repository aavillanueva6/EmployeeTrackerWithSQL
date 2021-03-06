// add dependencies
const sql = require('mysql2');

// add db connection
const db = require('../config/connection');

/**
 * runs db query to display all employees and their relevant data
 */
function viewAllEmps() {
  //imports startPrompts function to loop back to prompting the user for what they want to do next after this function is complete
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
