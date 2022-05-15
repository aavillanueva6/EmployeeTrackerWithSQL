// add dependencies
const inquirer = require('inquirer');
const sql = require('mysql2');

// add db connection
const db = require('../config/connection');

/**
 * function runs an inquirer prompt to get user input for the department name
 * then checks that the name is valid and if it is valid, runs a sql query to add the new department to the department table in the db
 */
function addDept() {
  //imports startPrompts function to loop back to prompting the user for what they want to do next after this function is complete
  const startPrompts = require('./InitPrompt.js');
  inquirer
    .prompt([
      {
        type: 'text',
        message: 'What is the name of the department?',
        name: 'deptName',
      },
    ])
    .then(function (response) {
      let deptName = response.deptName;
      // checks if the department name is valid (not an empty string)
      if (deptName === '') {
        console.error(`\nplease enter valid responses for prompts\n`);
        startPrompts();
      } else {
        db.query(
          `INSERT INTO department (name) VALUES (?)`,
          deptName,
          (err, results) => {
            console.log(`\nDepartment: "${deptName}" added to the database\n`);
            startPrompts();
          }
        );
      }
    });
}
module.exports = addDept;
