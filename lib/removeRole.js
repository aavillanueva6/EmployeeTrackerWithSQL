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

/**
 * prompts user for which role they want to remove. Calls the required db queries to execute the request
 * @param {array} roleList array of all roles in the role table
 */
function executePrompt(roleList) {
  //imports startPrompts function to loop back to prompting the user for what they want to do next after this function is complete
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
      // handles user response
      const roleTitle = response.roleTitle;

      // runs query to delete the selected role
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

/**
 * builds list of all roles and passes the role list to the inquirer prompts
 */
function removeRole() {
  let roleList = [];

  // queries the db to get all roles from the role table
  db.query('SELECT * FROM role', (err, results) => {
    results.forEach((element) => {
      roleList.push(element.title);
    });
    executePrompt(roleList);
  });
}
module.exports = removeRole;
