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

function executePrompt(empList) {
  const startPrompts = require('./InitPrompt.js');
  inquirer
    .prompt([
      {
        type: 'list',
        message: `Which employee would you like to remove?`,
        name: 'empName',
        choices: empList,
      },
    ])
    .then(function (response) {
      const empNameArr = response.empName.split(' ');
      const firstName = empNameArr[0];
      const lastName = empNameArr[1];
      let empID;

      db.query(
        `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`,
        empNameArr,
        (err, results) => {
          empID = results[0].id;
          db.query(
            `DELETE FROM employee WHERE id = ?`,
            empID,
            (err, response) => {
              console.log(
                `\nEmployee: "${firstName} ${lastName}" removed from the database\n`
              );
              startPrompts();
            }
          );
        }
      );
    });
}

function removeEmp() {
  let empList = [];
  db.query('SELECT * FROM employee', (err, results) => {
    results.forEach((element) => {
      empList.push(`${element.first_name} ${element.last_name}`);
    });
    executePrompt(empList);
  });
}
module.exports = removeEmp;
