// add dependencies
const inquirer = require(`inquirer`);

// add custom modules
const addDept = require(`./AddDept`);
const addEmp = require(`./addEmp`);
const addRole = require(`./addRole`);
const UpdateEmpRole = require(`./UpdateEmpRole`);
const ViewDepts = require(`./ViewAllDepts`);
const ViewEmps = require(`./ViewAllEmps`);
const ViewRoles = require(`./ViewAllRoles`);
const updateEmpManager = require(`./updateEmpManager`);
const viewEmpsByMan = require(`./viewEmpsByMan`);
const viewEmpsByDept = require(`./viewEmpsByDept`);
const removeDept = require(`./removeDept`);
const removeRole = require(`./removeRole`);
const removeEmp = require(`./removeEmp`);
const viewDeptBudg = require(`./viewDeptBudg`);

// provide user choices for what to do
function init() {
  inquirer
    .prompt([
      {
        type: `list`,
        message: `What would you like to do?`,
        name: `choice`,
        choices: [
          `View All Employees`,
          `Add Employee`,
          `Update Employee's Role`,
          `View All Roles`,
          `Add Role`,
          `View All Departments`,
          `Add Department`,
          `Update Employee's Manager`,
          `View Employees by Manager`,
          `View Employees by Department`,
          `Remove Department`,
          `Remove Role`,
          `Remove Employee`,
          `View Department Utilized Budget`,
          `Quit`,
        ],
      },
    ])
    .then(function (response) {
      // switch/case statement to direct application flow based on user selection from the prmopt.
      switch (response.choice) {
        case `View All Employees`:
          ViewEmps();
          break;
        case `Add Employee`:
          addEmp();
          break;
        case `Update Employee's Role`:
          UpdateEmpRole();
          break;
        case `View All Roles`:
          ViewRoles();
          break;
        case `Add Role`:
          addRole();
          break;
        case `View All Departments`:
          ViewDepts();
          break;
        case `Add Department`:
          addDept();
          break;
        case `Update Employee's Manager`:
          updateEmpManager();
          break;
        case `View Employees by Manager`:
          viewEmpsByMan();
          break;
        case `View Employees by Department`:
          viewEmpsByDept();
          break;
        case `Remove Department`:
          removeDept();
          break;
        case `Remove Role`:
          removeRole();
          break;
        case `Remove Employee`:
          removeEmp();
          break;
        case `View Department Utilized Budget`:
          viewDeptBudg();
          break;
        case `Quit`:
          // if quit is selected, a message is displayed to the user and the application is ended.
          console.log(`Thank you`);
          process.exit(0);
        default:
          console.error(`something has gone horribly wrong`);
          process.exit(0);
      }
    });
}

module.exports = init;
