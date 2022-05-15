// add dependencies
const inquirer = require('inquirer');
const sql = require('mysql2');

// add db connection
const db = require('../config/connection');

/**
 * function runs an inquirer prompt to get user input for the new role
 * then checks that the name is valid and if it is valid, runs a sql query to add the new role to the role table in the db
 */
function executePrompt(deptList) {
  //imports startPrompts function to loop back to prompting the user for what they want to do next after this function is complete
  const startPrompts = require('./InitPrompt.js');
  inquirer
    .prompt([
      {
        type: 'text',
        message: 'What is the name of the role?',
        name: 'roleName',
      },
      {
        type: 'text',
        message: 'What is the salary of the role?',
        name: 'roleSalary',
      },
      {
        type: 'list',
        message: 'Which department does the role belong to',
        name: 'roleDept',
        choices: deptList,
      },
    ])
    .then(function (response) {
      // checks for valid user input (input not empty strings)
      if (response.roleName === '' || response.roleSalary === '') {
        console.error(`\nplease enter valid responses for prompts\n`);
        startPrompts();
      } else {
        const salary = Number(response.roleSalary);

        // queries the database to find the department ID from the user selection
        db.query(
          `SELECT id FROM department WHERE name = ?`,
          response.roleDept,
          (err, results) => {
            dept = results[0].id;

            // query to insert the new role into the table
            db.query(
              `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`,
              [response.roleName, salary, dept],
              (err, results) => {
                // if an error occurs it sends a message to the user to enter valid prompts.  This error handler is added to catch salaries that are not numbers (i.e. 983A)
                if (err) {
                  console.error(`\nplease enter valid responses for prompts\n`);
                } else {
                  console.log(
                    `\nRole: "${response.roleName}" added to the database\n`
                  );
                }
                startPrompts();
              }
            );
          }
        );
      }
    });
}

/**
 * queries the db to build a list of departments, passes the department list into the inquirer prompts.
 */
function addRole() {
  const deptList = [];

  // db query to select the names from the department table
  db.query('SELECT name FROM department', (err, results) => {
    results.forEach((element) => {
      deptList.push(element.name);
    });
    executePrompt(deptList);
  });
}

module.exports = addRole;
