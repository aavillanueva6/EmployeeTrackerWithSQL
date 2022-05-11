// add dependencies
// const inquirer = require('inquirer');
// const sql = require('mysql2');
const logo = require('asciiart-logo');
// const config = require('./package.json');

// add custom modules
const startPrompts = require('./lib/InitPrompt');

function init() {
  console.log(
    logo({
      name: 'Employee Tracker',
      lineChars: 0,
      font: 'Fender',
    }).render()
  );
  startPrompts();
}

init();
