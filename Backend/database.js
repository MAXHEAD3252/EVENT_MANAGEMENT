const mysql = require('mysql2');
require('dotenv').config();

const userconnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

userconnection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    process.exit(1);
  }
  console.log('Connected to the database as ID ' + userconnection.threadId);
});

module.exports = userconnection;
// const mysql = require('mysql2');
// require('dotenv').config();

// const userconnection = mysql.createConnection({
//   host: process.env.DB_HOST || 'mysql', // Ensure this matches your service name
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || 'example',
//   database: process.env.DB_NAME || 'mydatabase'
// });

// userconnection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err.stack);
//     process.exit(1);
//   }
//   console.log('Connected to the database as ID ' + userconnection.threadId);
// });

// module.exports = userconnection;
