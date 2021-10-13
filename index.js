const inquirer = require('inquirer');
const queries = require('./queries');

const firstQ =   {
    type: 'list',
    message: 'What would you like to do?',
    name: 'firstQ',
    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
};

function init (){
    inquirer
    .prompt(firstQ)
    .then( (response) => {
        switch(response.firstQ) {
            case 'View All Departments':
                console.log('yup');
              break;
              case 'View All Roles':
                console.log('yupR');
              break;
              case 'View All Employees':
                console.log('yupE');
              break;
              case 'Add a Department':
                console.log('yupAD');
              break;
              case 'Add a Role':
                console.log('yupAR');
              break;
              case 'Add an Employee':
                console.log('yupAE');
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