// add dependencies
const logo = require('asciiart-logo');
const cTable = require('console.table');

// add custom modules
const startPrompts = require('./lib/InitPrompt');

function init() {
  // adds logo to start screen on application load
  console.log(
    logo({
      name: 'Employee Tracker',
      lineChars: 0,
      font: 'Fender',
    }).render()
  );
  // runs the initial set of prompts for the user
  startPrompts();
}

init();
