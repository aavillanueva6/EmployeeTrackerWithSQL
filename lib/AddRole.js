// add dependencies
const inquirer = require('inquirer');
const sql = require('mysql2');

// open connection to sql server
const db = sql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pass',
  database: 'employees_db',
});

function executePrompt(deptList) {
  const init = require('./InitPrompt.js');
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
      if (response.roleName === '' || response.roleSalary === '') {
        console.error(`\nplease enter valid responses for prompts\n`);
        init();
      } else {
        const salary = Number(response.roleSalary);

        db.query(
          `SELECT id FROM department WHERE name = ?`,
          response.roleDept,
          (err, results) => {
            dept = results[0].id;
            db.query(
              `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`,
              [response.roleName, salary, dept],
              (err, results) => {
                if (err) {
                  console.error(`\nplease enter valid responses for prompts\n`);
                } else {
                  console.log(
                    `\nRole: "${response.roleName}" added to the database\n`
                  );
                }
                init();
              }
            );
          }
        );
      }
    });
}

function addRole() {
  const deptList = [];

  db.query('SELECT name FROM department', (err, results) => {
    results.forEach((element) => {
      deptList.push(element.name);
    });
    executePrompt(deptList);
  });
}

module.exports = addRole;
