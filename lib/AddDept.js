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

function addDept() {
  const init = require('./InitPrompt.js');
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
      if (deptName === '') {
        console.error(`\nplease enter valid responses for prompts\n`);
        init();
      } else {
        db.query(
          `INSERT INTO department (name) VALUES (?)`,
          deptName,
          (err, results) => {
            console.log(`\nDepartment: "${deptName}" added to the database\n`);
            init();
          }
        );
      }
    });
}
module.exports = addDept;
