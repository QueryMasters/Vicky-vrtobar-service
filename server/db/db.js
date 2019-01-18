// const Sequelize = require('sequelize');
const { Pool, Client } = require('pg');

// const connection = new Sequelize('amazon_dev', 'root', 'student', {
//   host: 'localhost',
//   dialect: 'mysql',
//   logging: false,
// });

//Sequelize
// const connection = new Sequelize('amazon', 'root', 'student', {
//   host: 'localhost',
//   dialect: 'postgres',
//   logging: false,
//   pool: {
//     max: 10,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// })

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'amazon',
  password: 'student',
  port: 5432,
});

client.connect((err) => {
  if (err) {
      throw err;    
  } else {
      console.log('connected!');
  }
});



// connection
//   .authenticate()
//   .then(() => {
//     console.log('Connected to the database.');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

module.exports = {
  client,
};
