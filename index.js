//Imports the necissaru libraries
const mysql = require("mysql");
const inquirer = require("inquirer");

//Connects to Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password', //Change to your personal password
    database: 'employees_db'
},
console.log('Connected to employees_db')
);

//A Series of Promts that Chooses how User will Interact with db
inquirer.prompt([{
    type: 'list',
    name: 'prompt',
    message: 'What would you like to do?',
    choices: ['View All Department',
            'View All Employees',
            'View All Roles',
            'Update An Employee Role',
            'Add A Department',
            'Add An Employee',
            'Add New Deparment',
            'Exit'
        ]
}]).then((answers)=>{
const { choices } = answers;

if (choices === 'View All Department') {
    viewAllDepartments();
}
if (choices === 'View All Employees') {
    viewAllEmployees();
}
if (choices === 'View All Roles') {
    viewAllRoles();
}
if (choices === 'Update Employee Role') {
    updateEmployeeRole();
}
if (choices === 'Add New Employee') {
    addNewEmployee();
}
if (choices === 'Add New Role') {
    addNewRole();
}
if (choices === 'Add New Department') {
    addNewDepartment();
}
else{
    console.log('Disconnected from employees_db')
        db.end();
}
});

