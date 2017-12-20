create table groupe (
	id INT auto_increment not null,
	label varchar2(15),
	description varchar2(50)
	PRIMARY KEY (ID)
);

create table address (
	id INT auto_increment not null,
	address varchar2(50)
	PRIMARY KEY (ID)
);

create table identification (
	id INT auto_increment not null,
	login varchar2(30) not null,
	password varchar2(100) not null
	PRIMARY KEY (ID)
);

create table users (
	id INT auto_increment not null,
	name varchar2(15),
	surname varchar2(15),
	birth_date date,
	PRIMARY KEY (ID),
	FOREIGN KEY (groupID) REFERENCES groupe(id)
	FOREIGN KEY (addressID) REFERENCES address(id)
	FOREIGN KEY (identificationID) REFERENCES identification(id)
	
);