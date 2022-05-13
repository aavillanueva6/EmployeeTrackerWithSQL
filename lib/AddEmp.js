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
 * function runs an inquirer prompt to get user input for the new employee
 * then checks that the name is valid and if it is valid, runs a sql query to add the new employee to the employee table in the db
 */
function executePrompt(managerList, roleList) {
  //imports startPrompts function to loop back to prompting the user for what they want to do next after this function is complete
  const startPrompts = require('./InitPrompt.js');

  inquirer
    .prompt([
      {
        type: 'text',
        message: `What is the employee's first name?`,
        name: 'empFirstName',
      },
      {
        type: 'text',
        message: `What is the employee's last name?`,
        name: 'empLastName',
      },
      {
        type: 'list',
        message: `What is the employee's role?`,
        name: 'empRole',
        choices: roleList,
      },
      {
        type: 'list',
        message: `Who is the employee's manager?`,
        name: 'empManager',
        choices: managerList,
      },
    ])
    .then(function (response) {
      const firstName = response.empFirstName;
      const lastName = response.empLastName;
      const roleTitle = response.empRole;
      const managerNameArr = response.empManager.split(' ');
      let managerID;

      // checks that user input was valide (not empty strings)
      if (firstName === '' || lastName === '') {
        console.error(`\nplease enter valid responses for prompts\n`);
        startPrompts();
      } else {
        // sets the managerID to either the specified manager's id or null, if no manager was selected
        if (managerNameArr[0] === 'None') {
          managerID = null;
        } else {
          db.query(
            `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`,
            managerNameArr,
            (err, results) => {
              managerID = results[0].id;
            }
          );
        }
        // queries the db to find the id of the role from the user prompts
        db.query(
          `select id FROM role WHERE title = ?`,
          roleTitle,
          (err, results) => {
            const roleID = results[0].id;

            // adds new employee into the db
            db.query(
              `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
              [firstName, lastName, roleID, managerID],
              (err, results) => {
                console.log(
                  `\nEmployee: "${firstName} ${lastName}" added to the database\n`
                );
                startPrompts();
              }
            );
          }
        );
      }
    });
}

/**
 * queries the database for the list of employees and the list of roles to pass options into the inquirer selections during user input.
 */
function addEmp() {
  let managerList = [];
  db.query('SELECT * FROM employee', (err, results) => {
    results.forEach((element) => {
      managerList.push(`${element.first_name} ${element.last_name}`);
    });
    // adds an option to select for an employee to not have a manager
    managerList.push('None');
  });

  let roleList = [];
  db.query(`SELECT * FROM role`, (err, results) => {
    results.forEach((element) => {
      roleList.push(element.title);
    });
    executePrompt(managerList, roleList);
  });
}

module.exports = addEmp;
