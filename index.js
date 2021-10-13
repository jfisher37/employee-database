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
        type: `input`,
        message: `Please enter the associated department id for this role.`,
        name: `deptId`,
    }];


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

async function updateDeptList(){
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

async function updateRoleList(){
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

async function updateEmployeeList(){
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
    let title;
    let salary;
    let department_id;
    await inquirer
        .prompt(roleQs)
        .then((response) => {
            title = response.roleTitle;
            salary = response.roleSalary;
            department_id = response.deptId;
        });
    await queries.addRole(title, salary, department_id);
    await updateRoleList();
    doAgain();
};

async function addEmployee() {
    let title;
    let salary;
    let department_id;
    await inquirer
        .prompt(roleQs)
        .then((response) => {
            title = response.roleTitle;
            salary = response.roleSalary;
            department_id = response.deptId;
        });
    await queries.addRole(title, salary, department_id);
    await updateEmployeeList();
    doAgain();
};


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
                    console.log('yupUER');
                    break;
                default:
                    console.log('Not Possible');
            }
        })
}

// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
//create an init function that prompts with the above options

//Create a query file with the queries 

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids

//add a select all for departments and console.table it

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

//add a select all for roles and console.table it

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

//add a select all for employees and console.table it

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database

//Create an Insert into query

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

//Create an Insert into query

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

//Create an Insert into query

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

//Create an update query

//create a "would you like to do anything else" prompt. 

init();