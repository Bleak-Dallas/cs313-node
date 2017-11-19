/****************************************************************
 * Author: Dallas Bleak
 * Class: CS 313
 * 10 Teach : Team Activity
 ***************************************************************/
-- Drops existing tables prior to creating or recreating the tables
DROP TABLE IF EXISTS person;

-- create the table
CREATE TABLE person
(
	personID 			SERIAL			NOT NULL,
	personFirstName 	VARCHAR(100) 	NOT NULL,
	personLastName 		VARCHAR(100),
	personBirthDate 	DATE,
	PRIMARY KEY (personID)
);

-- insert data into the database
INSERT INTO person(personFirstName, personLastName, personBirthDate) VALUES
  ('Joseph', 'Smith', '1805-12-23'),
  ('Brigham', 'Young', '1801-06-01'),
  ('Thomas', 'Monson', '1927-08-21');

CREATE USER team10 WITH PASSWORD 'team10';
GRANT SELECT, INSERT, UPDATE ON person TO team10;