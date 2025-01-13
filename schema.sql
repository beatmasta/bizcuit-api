-- Create the database
CREATE DATABASE IF NOT EXISTS bizcuit_nl_todo_db;

-- Use the database
USE bizcuit_nl_todo_db;

-- Create the todos table
CREATE TABLE IF NOT EXISTS todos
(
    id        INT AUTO_INCREMENT PRIMARY KEY,
    title     VARCHAR(255) NOT NULL,
    completed BOOLEAN      NOT NULL DEFAULT FALSE,
    deadline  DATETIME     NULL
);
