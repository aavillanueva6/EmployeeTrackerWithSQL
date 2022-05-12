// add dependencies
const logo = require('asciiart-logo');
const cTable = require('console.table');

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
