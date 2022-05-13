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
 * @param {array} roleList - list of all roles from the role table
 */
function executePrompt(empList, roleList) {
  //imports startPrompts function to loop back to prompting the user for what they want to do next after this function is complete
  const startPrompts = require('./InitPrompt.js');

  inquirer
    .prompt([
      {
        type: 'list',
        message: `Which employee would you like to update?`,
        name: 'empName',
        choices: empList,
      },
      {
        type: 'list',
        message: `What should the employee's new role be?`,
        name: 'empRole',
        choices: roleList,
      },
    ])
    .then(function (response) {
      // handles user input from the inquirer prompt
      const empNameArr = response.empName.split(' ');
      const firstName = empNameArr[0];
      const lastName = empNameArr[1];
      const roleTitle = response.empRole;
      let empID;

      // query to get the employee ID from the prompt response
      db.query(
        `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`,
        empNameArr,
        (err, results) => {
          empID = results[0].id;

          // query to get the role ID from the prompt response
          db.query(
            `select id FROM role WHERE title = ?`,
            roleTitle,
            (err, results) => {
              const roleID = results[0].id;

              // query to update the employee data based on the prompt responses
              db.query(
                `UPDATE employee SET role_id=? WHERE id=?`,
                [roleID, empID],
                (err, results) => {
                  console.log(
                    `\nEmployee: "${firstName} ${lastName}" role changed to "${roleTitle}" in the database\n`
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
 * exported function executes queries to pass lists into inquirer function, then calls the executePrompt function
 */
function UpdateEmpRole() {
  let empList = [];
  db.query('SELECT * FROM employee', (err, results) => {
    results.forEach((element) => {
      empList.push(`${element.first_name} ${element.last_name}`);
    });
  });

  let roleList = [];
  db.query(`SELECT * FROM role`, (err, results) => {
    results.forEach((element) => {
      roleList.push(element.title);
    });
    executePrompt(empList, roleList);
  });
}
module.exports = UpdateEmpRole;
