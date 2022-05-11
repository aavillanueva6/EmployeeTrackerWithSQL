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
      console.log(response);
      const firstName = response.empFirstName;
      const lastName = response.empLastName;
      const roleTitle = response.empRole;
      const managerNameArr = response.empManager.split(' ');
      console.log(managerNameArr);
      db.query(
        `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`,
        managerNameArr,
        (err, results) => {
          console.log(results);
          const managerID = results[0].id;
          console.log(managerID);
          db.query(
            `select id FROM role WHERE title = ?`,
            roleTitle,
            (err, results) => {
              console.log(results);
              const roleID = results[0].id;
              console.log(roleID);
              // I don't currently have the managerID linked to anything... this isn't set up in my schema.  I need to get that working at some point here.
              db.query(
                `INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)`,
                [firstName, lastName, roleID],
                (err, results) => {
                  console.log(results);

                  const init = require('./InitPrompt.js');
                  init();
                }
              );
            }
          );
        }
      );
    });
}

function addEmp() {
  let managerList = [];
  db.query('SELECT * FROM employee', (err, results) => {
    results.forEach((element) => {
      managerList.push(`${element.first_name} ${element.last_name}`);
    });
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
