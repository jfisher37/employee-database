const preB = require('./db/connections');

const queries = { 
allDepts: async function () {
    const db = await preB;  
    const [results, fields] = await db.execute('SELECT * FROM department');
    console.table(results);
    return results
  
},

retDepts: async function () {
    const db = await preB;  
    const [results, fields] = await db.execute('SELECT * FROM department');
    return results;
  
},

allRoles: async function () {
    const db = await preB;
    const [results, fields] = await db.execute('SELECT * FROM role');
    console.table(results);
    return results;
},

retRoles: async function () {
    const db = await preB;
    const [results, fields] = await db.execute('SELECT * FROM role');
    return results;
},

allEmployees: async function () {
    const db = await preB;
    const [results, fields] = await db.execute('SELECT * FROM employee');
    console.table(results);
    return results;
},

retEmployees: async function () {
    const db = await preB;
    const [results, fields] = await db.execute('SELECT * FROM employee');
    return results;
},

addDept: async function (name) {
    const db = await preB;
    await db.execute('INSERT INTO department (name) VALUES (?);', [name]);
    console.log("Department Added!");
},

addRole: async function (title, salary, department_id) {
    const db = await preB;
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`;
    await db.execute(sql, [title, salary, department_id])
    console.log("Role Added!");
    
},

addEmployee: async function (first_name, last_name, role_id, manager_id) {
    const db = await preB;
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;
    await db.execute(sql, [first_name, last_name, role_id, manager_id]);
    console.log("Employee Added!");
    
},

updateEmployee: async function (id, role_id) {
    const db = await preB;
    const sql = `UPDATE employee SET role_id=? WHERE id = ?;`;
    await db.execute(sql, [role_id, id]);
    console.log("Employee Updated!");
},

}  

module.exports = queries

