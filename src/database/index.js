
import dbConfig from '../config/database.cjs';
import Url from '../models/Url.js';
import sequelize from 'sequelize';


const connection = new sequelize.Sequelize(dbConfig);
Url.init(connection);

export default connection;
