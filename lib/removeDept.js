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

function executePrompt(deptList) {
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

function removeDept() {
  let deptList = [];
  db.query('SELECT * FROM department', (err, results) => {
    results.forEach((element) => {
      deptList.push(element.name);
    });
    executePrompt(deptList);
  });
}
module.exports = removeDept;
