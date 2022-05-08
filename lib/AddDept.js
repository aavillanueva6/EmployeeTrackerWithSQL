// add dependencies
const inquirer = require('inquirer');
const sql = require('mysql2');

function init() {
  inquirer
    .prompt([
      {
        type: 'text',
        message: 'What is the name of the department?',
        name: 'deptName',
      },
    ])
    .then(function (response) {
      console.log(response);
    });
}
module.exports = init;
