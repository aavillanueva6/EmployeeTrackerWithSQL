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
      console.log(response);
      switch (response.choice) {
        case 'View All Employees':
          console.log('view all selected');
          ViewEmps();
          break;
        case 'Add Employee':
          console.log('add emp selected');
          addEmp();
          break;
        case 'Update Employee Role':
          console.log('update emp role selected');
          UpdateEmpRole();
          break;
        case 'View All Roles':
          console.log('view roles selected');
          ViewRoles();
          break;
        case 'Add Role':
          console.log('add role selected');
          addRole();
          break;
        case 'View All Departments':
          console.log('View depts selected');
          ViewDepts();
          break;
        case 'Add Department':
          console.log('add dept selected');
          addDept();
          break;
        case 'Quit':
          console.log('Thank you');
          return process.exit(0);
        default:
          console.error('something has gone horribly wrong');
      }
    });
}

module.exports = init;
