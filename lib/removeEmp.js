// add dependencies
const sql = require('mysql2');
const inquirer = require('inquirer');

// open connection to sql server
const db = sql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pass',
  database: 'employees_db',
});

/**
 * Prompts the user for which employee they want to remove, then runs the db queries required to execute the request.
 * @param {array} empList list of all employees
 */
function executePrompt(empList) {
  //imports startPrompts function to loop back to prompting the user for what they want to do next after this function is complete
  const startPrompts = require('./InitPrompt.js');
  inquirer
    .prompt([
      {
        type: 'list',
        message: `Which employee would you like to remove?`,
        name: 'empName',
        choices: empList,
      },
    ])
    .then(function (response) {
      // handles the data received from the inquirer prompt
      const empNameArr = response.empName.split(' ');
      const firstName = empNameArr[0];
      const lastName = empNameArr[1];
      let empID;

      // gets the id of the selected employee
      db.query(
        `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`,
        empNameArr,
        (err, results) => {
          empID = results[0].id;

          // deletes the selected employee from the db
          db.query(
            `DELETE FROM employee WHERE id = ?`,
            empID,
            (err, response) => {
              console.log(
                `\nEmployee: "${firstName} ${lastName}" removed from the database\n`
              );
              startPrompts();
            }
          );
        }
      );
    });
}

/**
 * builds a list of employees, then passes that list to the inquirer prompt
 */
function removeEmp() {
  let empList = [];
  db.query('SELECT * FROM employee', (err, results) => {
    results.forEach((element) => {
      empList.push(`${element.first_name} ${element.last_name}`);
    });
    executePrompt(empList);
  });
}
module.exports = removeEmp;
