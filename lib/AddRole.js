// add dependencies
const inquirer = require('inquirer');
const sql = require('mysql2');

// add custom modules
const init = require('./InitPrompt.js');

function addRole() {
  const db = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'employees_db',
  });

  const deptList = [];
  db.query('SELECT name FROM department', function (err, results) {
    results.forEach((element) => {
      deptList.push(element.name);
    });
  });

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
      console.log(response);
    });
}
module.exports = addRole;
