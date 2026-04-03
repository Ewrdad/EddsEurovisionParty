CREATE DATABASE EurovisionParty;
USE EurovisionParty;
-- Create tables for the Eurovision Party application

CREATE TABLE Session (
    id VARCHAR(6) PRIMARY KEY NOT NULL,
    config LONGTEXT,
);

CREATE TABLE User (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    votes LONGTEXT ,
    session_id VARCHAR(6) NOT NULL,
    FOREIGN KEY (session_id) REFERENCES Session(id)
);

CREATE Table Vote (
    country VARCHAR(255) PRIMARY KEY NOT NULL,
   votes INT NOT NULL,
   info LONGTEXT

);

CREATE DATABASE IF NOT EXISTS sessions;
CREATE USER 'session_user'@'localhost' IDENTIFIED BY 'session';
-- If your Express server might connect from a different host, replace 'localhost' with the appropriate IP address or '%' for any host (less secure).
-- For example, from any host:
-- CREATE USER 'session_user'@'%' IDENTIFIED BY 'your_secure_password';

GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER ON sessions.* TO 'session_user'@'localhost';
-- If you allowed connections from any host:
-- GRANT SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, ALTER TABLE ON sessions.* TO 'session_user'@'%';

FLUSH PRIVILEGES;