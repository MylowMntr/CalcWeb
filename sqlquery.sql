CREATE DATABASE calculator;

create user 'calculator'@'localhost' identified by 'calculator';
grant all privileges on calculator.* to 'calculator'@'localhost';

use calculator;