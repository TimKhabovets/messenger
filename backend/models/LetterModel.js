import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const Letter = db.define('letters', {
  text: DataTypes.STRING,
  topic: DataTypes.STRING,
  recipient: DataTypes.STRING,
  author: DataTypes.INTEGER,
  date: DataTypes.DATE,
  status: DataTypes.INTEGER
}, {
  timestamps: false,
  freezeTableName: true
});

  export default Letter;

(async () => {
  await db.sync();
})();