const preB = require('./db/connections');


 //add a select all for departments and console.table it
const queries = { 
allDepts: async function () {
    const db = await preB;  
    const [results, fields] = await db.execute('SELECT * FROM department');
    console.table(results);
  
},


// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

    //add a select all for roles and console.table it

allRoles: async function () {
    const db = await preB;
    const [results, fields] = await db.execute('SELECT * FROM role');
    console.table(results);
},

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

    //add a select all for employees and console.table it

allEmployees: async function () {
    const db = await preB;
    const [results, fields] = await db.execute('SELECT * FROM employee');
    console.table(results);
   
},

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database

    //Create an Insert into query

addDept: async function (name) {
    const db = await preB;
    await db.execute('INSERT INTO department (name) VALUES (?);', [name]);
    console.log("Department Added!");
},

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

    //Create an Insert into query
addRole: async function (title, salary, department_id) {
    const db = await preB;
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`;
    await db.execute(sql, [title, salary, department_id])
    console.log("Role Added!");
    
},
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

    //Create an Insert into query
addEmployee: async function (first_name, last_name, role_id, manager_id) {
    const db = await preB;
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;
    await db.execute(sql, [first_name, last_name, role_id, manager_id]);
    console.log("Employee Added!");
    
},
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

    //Create an update query
updateEmployee: async function (id, role_id) {
    const db = await preB;
    const sql = `UPDATE employee SET role_id=? WHERE id = ?;`;
    await db.execute(sql, [role_id, id]);
    console.log("Employee Updated!");
},

}  

queries.updateEmployee(4, 1);
module.exports = queries

