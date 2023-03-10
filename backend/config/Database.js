import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

const db = new Sequelize('railway', 'root', 'iOHLolqgQn8P2TusKOxb', {
    host: 'containers-us-west-205.railway.app',
    dialect: 'mysql',
    dialectModule: mysql2,
    port: 6751,
    pool: {
      max: 25,
      min: 0,
      acquire: 50000,
      idle: 10000,
    },
    dialectOptions: {
      connectTimeout: 60000,
      requestTimeout: 20000,
      options: {
        requestTimeout: 20000,
        connectTimeout: 20000,
      }
    },
    define: {
      timestamps: false
    }
}); 

db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

export default db;