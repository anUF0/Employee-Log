//Imports the necissaru libraries
const mysql = require('mysql2');
const inquirer = require('inquirer');

//Connects to Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password', //Change to your personal password
    database: 'employees_db'
},
console.log('Connected to employees_db')
);


const returnPrompts = () => { 
//A Series of Promts that Chooses how User will Interact with db
inquirer.prompt([
    {
    type: 'list',
    name: 'prompt',
    message: 'What would you like to do?',
    choices: ['View All Departments',
            'View All Employees',
            'View All Roles',
            'Update An Employee Role',
            'Add A Department',
            'Add An Employee',
            'Add New Deparment',
            'Exit',
        ],
}
]).then((answers)=>{
if (answers.prompt === 'View All Departments') {
    viewAllDepartments();
}
if (answers.prompt === 'View All Employees') {
    viewAllEmployees();
}
if (answers.prompt === 'View All Roles') {
    viewAllRoles();
}
if (answers.prompt === 'Update Employee Role') {
    updateEmployeeRole();
}
if (answers.prompt === 'Add New Employee') {
    addNewEmployee();
}
if (answers.prompt === 'Add New Role') {
    addNewRole();
}
if (answers.prompt === 'Add New Department') {
    addNewDepartment();
}
if(answers.prompt === 'Exit'){
    console.log('Disconnected from employees_db');
    db.end();
}
})   
};

const viewAllDepartments = () => {
    const query = 'SELECT * FROM departments';
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        returnPrompts();
    })

}

const viewAllEmployees = () => {
    const query = 'SELECT * FROM employees';
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        returnPrompts();
    })
}

const viewAllRoles = () => {
    const query = 'SELECT * FROM roles';
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        returnPrompts();
    })
}

//Intisation
returnPrompts();