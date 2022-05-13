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

function executePrompt(roleList) {
  const startPrompts = require('./InitPrompt.js');
  inquirer
    .prompt([
      {
        type: 'list',
        message: `Which role would you like to remove?`,
        name: 'roleTitle',
        choices: roleList,
      },
    ])
    .then(function (response) {
      const roleTitle = response.roleTitle;
      db.query(
        `DELETE FROM role WHERE title = ?`,
        roleTitle,
        (err, response) => {
          console.log(`\nRole: "${roleTitle}" removed from the database\n`);
          startPrompts();
        }
      );
    });
}

function removeRole() {
  let roleList = [];
  db.query('SELECT * FROM role', (err, results) => {
    results.forEach((element) => {
      roleList.push(element.title);
    });
    executePrompt(roleList);
  });
}
module.exports = removeRole;
