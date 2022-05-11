// add dependencies
const inquirer = require('inquirer');

// add custom modules
const addDept = require('./AddDept');
const addEmp = require('./addEmp');
const addRole = require('./addRole');
const UpdateEmpRole = require('./UpdateEmpRole');
const ViewDepts = require('./ViewAllDepts');
const ViewEmps = require('./ViewAllEmps');
const ViewRoles = require('./ViewAllRoles');

function init() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'choice',
        choices: [
          'View All Employees',
          'Add Employee',
          'Update Employee Role',
          'View All Roles',
          'Add Role',
          'View All Departments',
          'Add Department',
          'Quit',
        ],
      },
    ])
    .then(function (response) {
      switch (response.choice) {
        case 'View All Employees':
          ViewEmps();
          break;
        case 'Add Employee':
          addEmp();
          break;
        case 'Update Employee Role':
          UpdateEmpRole();
          break;
        case 'View All Roles':
          ViewRoles();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'View All Departments':
          ViewDepts();
          break;
        case 'Add Department':
          addDept();
          break;
        case 'Quit':
          console.log('Thank you');
          return process.exit(0);
        default:
          console.error('something has gone horribly wrong');
          return process.exit(0);
      }
    });
}

module.exports = init;
