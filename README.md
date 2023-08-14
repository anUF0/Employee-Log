# Employee Log
## Description
This app is a command line application that can be used to perform rudimentary management tasks for a small employee base.

## Table of Contents 
- [Installation](#installation)
- [Usage](#usage)
- [Contributions](#contribution)
- [License](#license)
- [Tests](#tests)
- [Questions](#questions)

## Installation
This app is intended to be use in an intergrated terminal. After performing an 'npm install' to load the necessary dependancies, it can be run with the command 'npm start'.

## Usage
Once running the used will be presented with a series of looping prompts that can view, update, add and delete from a series of tables relating to the 'Departements' and 'Employees' and their job 'Roles' of your company. The basic structure of these tables and how they interact can be found in the 'schema.sql'. Note that removing a department will remove all relevent roles, though employees will not be removed from the system. When the user is done, they can select the 'Exit' command to end the application.

## Contributions
This project was made with assistance of inquirer, nodejs and mysql2.

## Tests
Demonstration:


By sourcing the [!seeds](./db/seeds.sql) file you can use example data to  familiarise yourself with the program.

## Questions
For anymore questions contact me at https://github.com/anUF0
