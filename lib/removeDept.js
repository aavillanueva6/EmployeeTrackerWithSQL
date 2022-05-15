// add dependencies
const sql = require('mysql2');
const inquirer = require('inquirer');

// add db connection
const db = require('../config/connection');

/**
 * prompts the user for which department they want to remove, then runs required queries to execute that request
 * @param {array} deptList array of department names
 */
function executePrompt(deptList) {
  //imports startPrompts function to loop back to prompting the user for what they want to do next after this function is complete
  const startPrompts = require('./InitPrompt.js');
  inquirer
    .prompt([
      {
        type: 'list',
        message: `Which department would you like to remove?`,
        name: 'deptName',
        choices: deptList,
      },
    ])
    .then(function (response) {
      const deptName = response.deptName;

      // query to delete the selected department from the prompt.
      db.query(
        `DELETE FROM department WHERE name = ?`,
        deptName,
        (err, response) => {
          console.log(
            `\nDepartment: "${deptName}" removed from the database\n`
          );
          startPrompts();
        }
      );
    });
}

/**
 * builds a department list and passes the list to the inquirer prompts
 */
function removeDept() {
  let deptList = [];
  // selects all departments from the department table
  db.query('SELECT * FROM department', (err, results) => {
    results.forEach((element) => {
      deptList.push(element.name);
    });
    executePrompt(deptList);
  });
}
module.exports = removeDept;
