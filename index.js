const inquirer = require('inquirer');
const queries = require('./queries');

let departmentList = [];
let deptNames = [];
let roleList = [];
let roleTitles = [];
let employeeList = [];
let employeeNames = [];

const firstQ = {
    type: 'list',
    message: 'What would you like to do?',
    name: 'firstQ',
    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
};

const againQ = {
    type: 'list',
    message: 'Would you like to do anything else?',
    name: 'againQ',
    choices: ['Yes', 'No'],
};

const deptQ = {
    type: 'input',
    message: 'What would you like to call the new department?',
    name: 'deptQ',
};




function doAgain() {
    inquirer
        .prompt(againQ)
        .then((response) => {
            if (response.againQ === 'Yes') {
                init();
            }
            else {
                console.info("See you next time!")
                return
            }
        })
};

async function updateDeptList() {
    const depts = await queries.retDepts();
    departmentList = [];
    deptNames = [];
    for (let i = 0; i < depts.length; i++) {
        departmentList.push({ id: depts[i].id, name: depts[i].name });
        deptNames.push(depts[i].name);
    };
    console.log(departmentList);
    console.log(deptNames);
}

async function updateRoleList() {
    const roles = await queries.retRoles();
    roleList = [];
    roleTitles = [];
    for (let i = 0; i < roles.length; i++) {
        roleList.push({ id: roles[i].id, title: roles[i].title, salary: roles[i].salary, department_id: roles[i].department_id });
        roleTitles.push(roles[i].title);
    };
    console.log(roleList);
    console.log(roleTitles);
}

async function updateEmployeeList() {
    const employees = await queries.retEmployees();
    employeeList = [];
    employeeNames = [];
    for (let i = 0; i < employees.length; i++) {
        employeeList.push({ id: employees[i].id, first_name: employees[i].first_name, last_name: employees[i].last_name, role_id: employees[i].role_id, manager_id: employees[i].manager_id });
        employeeNames.push(`${employees[i].first_name} ${employees[i].last_name}`)
    };
    console.log(employeeList);
    console.log(employeeNames);
}

async function allDepts() {
    await queries.allDepts();
    doAgain();
};

async function allRoles() {
    await queries.allRoles();
    doAgain();
};

async function allEmployees() {
    await queries.allEmployees();
    doAgain();
};

async function addDept() {
    let name;
    await inquirer
        .prompt(deptQ)
        .then((response) => name = response.deptQ);
    await queries.addDept(name);
    await updateDeptList();
    doAgain();
};

async function addRole() {
    const roleQs = [
        {
            type: `input`,
            message: `What would you like to call the new role?`,
            name: `roleTitle`,
        },
        {
            type: `input`,
            message: `Please enter the salary of this role (without commas or dollar signs).`,
            name: `roleSalary`,
        },
        {
            type: `list`,
            message: `Please select the associated department for this role.`,
            name: `deptName`,
            choices: deptNames,
        }];
    let title;
    let salary;
    let department_id;
    await inquirer
        .prompt(roleQs)
        .then((response) => {
            title = response.roleTitle;
            salary = response.roleSalary;
            for (let i = 0; i < departmentList.length; i++) {
                if (response.deptName === departmentList[i].name) {
                    department_id = departmentList[i].id
                }
            }
        });
    await queries.addRole(title, salary, department_id);
    await updateRoleList();
    doAgain();
};

async function addEmployee() {
    const employeeQs = [
        {
            type: `input`,
            message: `What's the new employee's first name?'`,
            name: `firstName`,
        },
        {
            type: `input`,
            message: `What's the new employee's last name?`,
            name: `lastName`,
        },
        {
            type: `list`,
            message: `Please select this employee's role.`,
            name: `role`,
            choices: roleTitles,
        },
        {
            type: `list`,
            message: `Please select this employee's manager.`,
            name: `manager`,
            choices: employeeNames,
        }];
    let first_name;
    let last_name;
    let role_id;
    let manager_id;
    await inquirer
        .prompt(employeeQs)
        .then((response) => {
            first_name = response.firstName.trim();
            last_name = response.lastName.trim();
            for (let i = 0; i < roleList.length; i++) {
                if (response.role === roleList[i].title) {
                    role_id = roleList[i].id
                }
            }
            for (let i = 0; i < employeeList.length; i++) {
                const firstAndLast = response.manager.split(" ");
                if (firstAndLast[0] === employeeList[i].first_name && firstAndLast[1] === employeeList[i].last_name) {
                    manager_id = employeeList[i].id
                }
            }

        });
    await queries.addEmployee(first_name, last_name, role_id, manager_id);
    await updateEmployeeList();
    doAgain();
};

async function updateEmployee() {
    const employeeUpdateQs = [
        {
            type: `list`,
            message: `Which employee would you like to update?`,
            name: `employee`,
            choices: employeeNames,
        },
        {
            type: `list`,
            message: `Please select this employee's new role.`,
            name: `role`,
            choices: roleTitles,
        }];
    let id;
    let role_id;
    await inquirer
        .prompt(employeeUpdateQs)
        .then((response) => {
            for (let i = 0; i < roleList.length; i++) {
                if (response.role === roleList[i].title) {
                    role_id = roleList[i].id
                }
            }
            for (let i = 0; i < employeeList.length; i++) {
                const firstAndLast = response.employee.split(" ");
                if (firstAndLast[0] === employeeList[i].first_name && firstAndLast[1] === employeeList[i].last_name) {
                    id = employeeList[i].id
                }
            }

        });
    await queries.updateEmployee(id, role_id)
    await updateEmployeeList();
    doAgain();
}

function seed() {
    updateDeptList();
    updateRoleList();
    updateEmployeeList();
}

async function init() {
    await seed();
    await inquirer
        .prompt(firstQ)
        .then((response) => {
            switch (response.firstQ) {
                case 'View All Departments':
                    allDepts();
                    break;
                case 'View All Roles':
                    allRoles();
                    break;
                case 'View All Employees':
                    allEmployees();
                    break;
                case 'Add a Department':
                    addDept();
                    break;
                case 'Add a Role':
                    addRole();
                    break;
                case 'Add an Employee':
                    addEmployee();
                    break;
                case 'Update an Employee Role':
                    updateEmployee();
                    break;
                default:
                    console.log('Not Possible');
            }
        })
}

init();