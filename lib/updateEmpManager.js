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

/**
 * function prompts the user with the inquirer package, then makes a series of queries to the db in order to update the selected employee
 * @param {array} empList - list of all employees from the employee table
 */
function identifyEmployee(empList) {
  const startPrompts = require('./InitPrompt.js');

  inquirer
    .prompt([
      {
        type: 'list',
        message: `Which employee would you like to update?`,
        name: 'empName',
        choices: empList,
      },
    ])
    .then(function (response) {
      console.log(empList);
      const updatedEmp = response.empName;

      let empIndex = empList.indexOf(response.empName);
      empList.splice(empIndex, 1);
      identifyManager(empList, updatedEmp);
    });
}

function identifyManager(empList, updatedEmp) {
  const startPrompts = require('./InitPrompt.js');

  inquirer
    .prompt([
      {
        type: 'list',
        message: `Who should the employee's manager be?`,
        name: 'manName',
        choices: empList,
      },
    ])
    .then(function (response) {
      const empNameArr = updatedEmp.split(' ');
      const empFirstName = empNameArr[0];
      const empLastName = empNameArr[1];
      let empID;
      const manNameArr = response.manName.split(' ');
      const manFirstName = manNameArr[0];
      const manLastName = manNameArr[1];
      let manID;

      db.query(
        `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`,
        empNameArr,
        (err, results) => {
          empID = results[0].id;
          db.query(
            `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`,
            manNameArr,
            (err, results) => {
              manID = results[0].id;
              db.query(
                `UPDATE employee SET manager_id=? WHERE id=?`,
                [manID, empID],
                (err, results) => {
                  console.log(
                    `\nEmployee: "${empFirstName} ${empLastName}" manager changed to "${manFirstName} ${manLastName}" in the database\n`
                  );
                  startPrompts();
                }
              );
            }
          );
        }
      );
    });
}

/**
 * exported function executes queries to pass lists into inquirer function, then calls the identifyEmployee function
 */
function UpdateEmpRole() {
  let empList = [];
  db.query('SELECT * FROM employee', (err, results) => {
    results.forEach((element) => {
      empList.push(`${element.first_name} ${element.last_name}`);
    });
    identifyEmployee(empList);
  });
}
module.exports = UpdateEmpRole;
