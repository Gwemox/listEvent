create table groupe (
	id INT not null auto_increment,
	label varchar2(15),
	description varchar2(50),
	PRIMARY KEY (id)
);

create table address (
	id INT auto_increment not null,
	address varchar2(50),
	PRIMARY KEY (id)
);

create table identification (
	id INT auto_increment not null,
	login varchar2(30) not null,
	password varchar2(100) not null,
	PRIMARY KEY (id)
);

create table users (
	id INT auto_increment not null,
	name varchar2(15),
	surname varchar2(15),
	birth_date date,
	PRIMARY KEY (id),
	FOREIGN KEY (groupID) REFERENCES groupe(id),
	FOREIGN KEY (identificationID) REFERENCES identification(id)
	
);

create table user_address_facturation(
	id INT auto_increment not null,
	PRIMARY KEY (id),
	FOREIGN KEY (userID) REFERENCES users(id),
	FOREIGN KEY (addressID) REFERENCES address(id)
);

create table user_address_livraison(
	id INT auto_increment not null,
	PRIMARY KEY (id),
	FOREIGN KEY (userID) REFERENCES users(id),
	FOREIGN KEY (addressID) REFERENCES address(id)
);