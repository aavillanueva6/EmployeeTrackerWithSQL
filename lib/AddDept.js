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
      let deptName = response.deptName;
      db.query(
        `INSERT INTO department (name) VALUES (?)`,
        deptName,
        (err, results) => {
          console.log(results);

          const init = require('./InitPrompt.js');
          init();
        }
      );
    });
}
module.exports = init;
