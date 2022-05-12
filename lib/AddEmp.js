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

function executePrompt(managerList, roleList) {
  const init = require('./InitPrompt.js');

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

      if (firstName === '' || lastName === '') {
        console.error(`\nplease enter valid responses for prompts\n`);
        init();
      } else {
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
        db.query(
          `select id FROM role WHERE title = ?`,
          roleTitle,
          (err, results) => {
            const roleID = results[0].id;

            db.query(
              `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
              [firstName, lastName, roleID, managerID],
              (err, results) => {
                console.log(
                  `\nEmployee: "${firstName} ${lastName}" added to the database\n`
                );
                init();
              }
            );
          }
        );
      }
    });
}

function addEmp() {
  let managerList = [];
  db.query('SELECT * FROM employee', (err, results) => {
    results.forEach((element) => {
      managerList.push(`${element.first_name} ${element.last_name}`);
    });
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
