//Imports the necissaru libraries
const mysql = require('mysql2');
const inquirer = require('inquirer');
//This line was auto-generated by a newer version of Inquirer
const { default: prompt } = require('inquirer/lib/ui/prompt');

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
            `Update an Employee's Manager`,
            'Add New Department',
            'Add New Employee',
            'Add New Role',
            'Delete Employee',
            'Delete Department',
            'Delete Role',
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
if (answers.prompt === `Update an Employee's Manager`) {
    updateManagerId();
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
if (answers.prompt === 'Delete Employee') {
    deleteEmployee();
}
if(answers.prompt === 'Delete Department'){
    deleteDepartment();
}
if(answers.prompt === 'Delete Role'){
    deleteRole();
}
if(answers.prompt === 'Exit'){
    console.log('Disconnected from employees_db');
    db.end();
}
})   
};

//Function that brings up the 'departments' table
const viewAllDepartments = () => {
    const query = 'SELECT * FROM departments';
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        returnPrompts();
    })

}

//Function that brings up the 'employees' table
const viewAllEmployees = () => {
    const query = 'SELECT * FROM employees';
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        returnPrompts();
    })
}

//Function that brings up the 'roles' table
const viewAllRoles = () => {
    const query = 'SELECT * FROM roles';
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        returnPrompts();
    })
}

//Function that updates 'employees' table
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

//Function updates a Employee's Manager
const updateManagerId= () => {
    db.query('SELECT * FROM employees', (err, employees) => {
        if (err) console.log(err);
        employees = employees.map((employees) => {
            return {
                name: `${employees.first_name} ${employees.last_name}`,
                value: employees.id,
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
    name: 'selectedManger',
    message: 'Who is their New Manger?',
    choices: employees,
    }
],
).then((data) => {
    db.query('UPDATE employees SET ? WHERE ?', [{manager_id: data.selectedManger}, {id: data.selectedEmployee}],
    function (err) {
        if (err) throw err;
    });
    console.log('Employee Successfully Updated');
    viewAllEmployees();
});
});
};



//Function adds to the 'departments' table
const addNewDepartment = () =>{
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: `What is the New Department Called?`
        }
    ]).then((data) =>{
        db.query('INSERT INTO departments SET ?',
        {
            name: data.departmentName
        })
        viewAllDepartments();
    })
};

//Function adds to the 'roles' table
const addNewRole = () =>{
    db.query('SELECT * FROM departments', (err, departments)=>{
        if(err)console.log(err);
        departments = departments.map((departments) => {
        return {
            name: departments.name,
            value: departments.id,
        };
    });
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is this New Role Called?'
        },
        {
            type: 'input',
            name: 'salary',
            message: `What is the Monthy Salary(Numbers only, no "$" or ",")?`
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'What Department does it Belong to?',
            choices: departments,
        },
    ]).then((data) =>{
        db.query('INSERT INTO roles SET ?',
        {
            title: data.title,
            salary: data.salary,
            department_id: data.departmentId,
        });
        viewAllRoles();
    })
});
};

//Function adds to the 'employees' table
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
            name: 'manager',
            message: 'Who their Manager?',
            choices: employees,
            //WIP Cannot set additional 'null' choice
        }
    ]).then((data) =>{
        console.log(data.role)
        console.log(data.manager)
        db.query('INSERT INTO employees SET ?',
        {
            first_name: data.firstName,
            last_name: data.lastName,
            role_id: data.role,
            manager_id: data.manager
        })
        viewAllEmployees();
    })
});
});
};

//Function for deleting Employees. NOTE: Is Cascading
const deleteEmployee = () => {
    db.query('SELECT * FROM employees', (err, employees) => {
        if (err) console.log(err);
        employees = employees.map((employees) => {
            return {
                name: `${employees.first_name} ${employees.last_name}`,
                value: employees.id,
            };
    });
inquirer.prompt([
    {
    type: 'list',
    name: 'selectedEmployee',
    message: 'Which Employee Would You like to Remove?',
    choices: employees,
    },
],
).then((data) => {
    db.query('DELETE FROM employees WHERE ?', [{id: data.selectedEmployee}],
    function (err) {
        if (err) throw err;
    });
    console.log('Employee Removed from Database');
    viewAllEmployees();
});
});
}

//Function for deleting Departments. NOTE: Is Cascading
const deleteDepartment = () => {
    db.query('SELECT * FROM departments', (err, departments)=>{
        if(err)console.log(err);
        departments = departments.map((departments) => {
        return {
            name: departments.name,
            value: departments.id,
        };
    });
    inquirer.prompt([
        {
            type: 'list',
            name: 'selectedDepartment',
            message: 'Which Department Would You Like to Delete?',
            choices: departments
        },
    ]).then((data) => {
    db.query('DELETE FROM departments WHERE ?', [{id: data.selectedDepartment}],
    function (err) {
        if (err) throw err;
    });
    console.log('Department Removed from Database');
    viewAllDepartments();
    });
});
}

//Function for deleting Roles. NOTE: Is Cascading
const deleteRole = () => {
    db.query('SELECT * FROM roles', (err, roles)=>{
        if(err)console.log(err);
        roles = roles.map((roles) => {
        return {
            name: roles.title,
            value: roles.id,
        };
    });
    inquirer.prompt([
        {
            type: 'list',
            name: 'selectedRole',
            message: 'Which Role Would You Like to Delete?',
            choices: roles
        },
    ]).then((data) => {
    db.query('DELETE FROM roles WHERE ?', [{id: data.selectedRole}],
    function (err) {
        if (err) throw err;
    });
    console.log('Role Removed from Database');
    viewAllRoles();
    });
});
}

//Inti
returnPrompts();