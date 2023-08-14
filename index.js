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
            `Update an Employee's Role`,
            'Add New Department',
            'Add New Employee',
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
if (answers.prompt === `Update an Employee's Role`) {
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

const updateEmployeeRole = () => {
    db.query('SELECT * FROM employees', (err, employees) => {
        if (err) console.log(err);
        employees = employees.map((employees) => {
            return {
                name: `${employees.first_name} ${employees.last_name}`,
                value: employees.id,
            };
    });
    db.query('SELECT * FROM roles', (err, roles) => {
        if (err) console.log(err);
        roles = roles.map((roles) => {
        return {
            name: roles.title,
            value: roles.id,
            };
});
inquirer.prompt([
    {
    type: 'list',
    name: 'selectedEmployee',
    message: 'Which Employee Would You like to Update?',
    choices: employees,
    },
    {
    type: 'list',
    name: 'selectedRole',
    message: 'What is their New Role?',
    choices: roles
    }
],
).then((data) => {
    db.query('UPDATE employees SET ? WHERE ?', [{role_id: data.selectedRole}, {id: data.selectedEmployee}],
    function (err) {
        if (err) throw err;
    });
    console.log('Employee Successfully Updated');
    viewAllEmployees();
});
});
});
};

const addNewEmployee = () =>{
    db.query('SELECT * FROM roles', (err, roles)=>{
        if(err)console.log(err);
        roles = roles.map((roles) => {
        return {
            name: roles.title,
            value: roles.id,
        };
    });
    db.query('SELECT * FROM employees', (err, employees)=>{
        if(err)console.log(err);
        employees = employees.map((employees) => {
        return {
            name: `${employees.first_name} ${employees.last_name}`,
            value: employees.id,
        };
    });
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the First Name of the New Employee'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the Last Name of the New Employee'
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is their Role?',
            choices: roles,
        },
        {
            type: 'list',
            name: 'managerId',
            message: 'Who their Manager?',
            choices: employees,
        }
    ]).then((data) =>{
        db.query('INSERT INTO employees SET ?',
        {
            first_name: data.firstName,
            last_name: data.lastName,
            role_id: data.role,
            manager_id: data.managerId
        })
        viewAllEmployees();
    })
});
});
};

//Intisation
returnPrompts();