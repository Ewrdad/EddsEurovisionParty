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


