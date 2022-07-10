drop database if exists bd_copanga;

create database bd_copanga;

use bd_copanga;

create table tbl_sensor(
	dataHora date not null,
    valorSensor float not null,
    id_sensor int not null
);

create table tbl_valvula(
	acionado datetime not null,
    desligado datetime not null,
    id_valvula int not null
);

