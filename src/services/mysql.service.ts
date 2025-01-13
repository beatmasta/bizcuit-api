import mysql from 'mysql2/promise';
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const {MYSQL_HOST: host, MYSQL_USER: user, MYSQL_PASSWORD: password, MYSQL_DATABASE: database} = process.env;

console.log(`Creating MySQL pool with config - host: ${host}, user: ${user}, database: ${database}`);

const pool = mysql.createPool({
    host,
    user,
    password,
    database,
});

export default pool;
