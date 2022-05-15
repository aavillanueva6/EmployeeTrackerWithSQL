// add dependencies
const inquirer = require('inquirer');
const sql = require('mysql2');

// add db connection
const db = require('../config/connection');

/**
 * function prompts the user with the inquirer package, then makes a series of queries to the db in order to update the selected employee
 * @param {array} empList - list of all employees from the employee table
 */
function identifyEmployee(empList) {
  //imports startPrompts function to loop back to prompting the user for what they want to do next after this function is complete
  const startPrompts = require('./InitPrompt.js');

  inquirer
    .prompt([
      {
        type: 'list',
        message: `Which employee would you like to update?`,
        name: 'empName',
        choices: empList,
      },
    ])
    .then(function (response) {
      // handles user prompt response
      const updatedEmp = response.empName;

      // removes the selected employee from the empList, so that the prompt for which manager should be assiged to the employee does not also include the selected employee
      let empIndex = empList.indexOf(response.empName);
      empList.splice(empIndex, 1);

      // calls the identifyManager function with the updated empList and the selected employee from the first prompt
      identifyManager(empList, updatedEmp);
    });
}

/**
 *
 * @param {array} empList array of all employees (excluding the selected employee from initial prompt)
 * @param {string} updatedEmp response from first prompt (employee selected to modify)
 */
function identifyManager(empList, updatedEmp) {
  const startPrompts = require('./InitPrompt.js');

  inquirer
    .prompt([
      {
        type: 'list',
        message: `Who should the employee's manager be?`,
        name: 'manName',
        choices: empList,
      },
    ])
    .then(function (response) {
      // defines variables needed for queries and responses.  one set for the updated employee, and another set for the manager that will be assigned to the employee.
      const empNameArr = updatedEmp.split(' ');
      const empFirstName = empNameArr[0];
      const empLastName = empNameArr[1];
      let empID;
      const manNameArr = response.manName.split(' ');
      const manFirstName = manNameArr[0];
      const manLastName = manNameArr[1];
      let manID;

      // gets the ID of the employee that will be updated
      db.query(
        `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`,
        empNameArr,
        (err, results) => {
          empID = results[0].id;

          // gets the ID of the newly selected manager
          db.query(
            `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`,
            manNameArr,
            (err, results) => {
              manID = results[0].id;

              // updates the employee data to have the new manager replace their previous manager.
              db.query(
                `UPDATE employee SET manager_id=? WHERE id=?`,
                [manID, empID],
                (err, results) => {
                  console.log(
                    `\nEmployee: "${empFirstName} ${empLastName}" manager changed to "${manFirstName} ${manLastName}" in the database\n`
                  );
                  startPrompts();
                }
              );
            }
          );
        }
      );
    });
}

/**
 * build list of all employees and passes that to the identifyEmployee function.
 */
function UpdateEmpRole() {
  let empList = [];
  db.query('SELECT * FROM employee', (err, results) => {
    results.forEach((element) => {
      empList.push(`${element.first_name} ${element.last_name}`);
    });
    identifyEmployee(empList);
  });
}
module.exports = UpdateEmpRole;
