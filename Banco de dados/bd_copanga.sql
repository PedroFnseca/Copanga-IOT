DROP DATABASE IF EXISTS bd_copanga;

CREATE DATABASE bd_copanga;

USE bd_copanga;

CREATE TABLE tbl_sensor(
  dataHora DATE NOT NULL,
  valorSensor FLOAT NOT NULL,
  id_sensor INT NOT NULL
);

CREATE TABLE tbl_valvula(
  acionado DATETIME NOT NULL,
  desligado DATETIME NOT NULL,
  id_valvula INT NOT NULL
);

CREATE TABLE tbl_meteorologia(
  temperatura FLOAT NOT NULL,
  umidade FLOAT NOT NULL,
  dataHora DATETIME NOT NULL
);
