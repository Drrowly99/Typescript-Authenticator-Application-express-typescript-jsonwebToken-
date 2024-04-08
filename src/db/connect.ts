import mysql, { Pool, PoolConfig } from 'mysql';
import dotenv from 'dotenv';
import log from '../logger';

// Define MySQLConfig interface for PoolConfig
interface MySQLConfig extends PoolConfig {
  port?: number;
  host?: string;
  user?: string;
  password?: string;
  database?: string;
}

// Load environment variables
dotenv.config();

// Create MySQL configuration object
const mysqlConfig: MySQLConfig = {
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10'),
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'speedlinks',
  port: parseInt(process.env.DB_PORT || '3306'),
};

// Create MySQL pool using the configuration object
const mysqlPool: Pool = mysql.createPool(mysqlConfig);

// Function to test MySQL connection
const testMySQLConnection = () => {
  mysqlPool.getConnection((err, connection) => {
    if (err) {
      log.info('Error getting MySQL connection:', err);
      return;
    }
    log.info('Connected to MySQL database');
    connection.release(); // Release the connection
  });
};

// Export the MySQL pool and testMySQLConnection function
export { mysqlPool, testMySQLConnection };
