const db = require('./db/connections');

 //add a select all for departments and console.table it
const queries = { 
allDepts: function () {
     db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
  })
},


// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

    //add a select all for roles and console.table it

allRoles: function () {
    db.query('SELECT * FROM role', function (err, results) {
    console.table(results);
    })
},

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

    //add a select all for employees and console.table it

allEmployees: function () {
    db.query('SELECT * FROM employee', function (err, results) {
    console.table(results);
    })
},

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database

    //Create an Insert into query

addDept: function (name) {
    db.query('INSERT INTO department (name) VALUES (?);', name, function (err, results) {
    console.log("Department Added!");
    })
},

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

    //Create an Insert into query
addRole: function (title, salary, department_id) {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`;
    db.query(sql, [title, salary, department_id],  function (err, results) {
        if(err){console.log(err);};
        console.log(results);
    console.log("Role Added!");
    })
},
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

    //Create an Insert into query
addEmployee: function (first_name, last_name, role_id, manager_id) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;
    db.query(sql, [first_name, last_name, role_id, manager_id],  function (err, results) {
    console.log("Employee Added!");
    })
},
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

    //Create an update query
updateEmployee: function (id, role_id) {
    const sql = `UPDATE employee SET role_id="?" WHERE id = ?;`;
    db.query(sql, [role_id, id],  function (err, results) {
    console.log("Employee Updated!");
    })
},

}  

// console.log('okay');
queries.updateEmployee(5, 3);
module.exports = queries

