/* Link to the SQL diagram (up to date, private access): https://drawsql.app/kevin-andries/diagrams/real-estate-crm */

-- DROP SCHEMA public CASCADE;
-- CREATE SCHEMA PUBLIC;

/* Statements to create tables */
CREATE TABLE plan(
	plan_id INT,
	title VARCHAR(20) NOT NULL,
	price DECIMAL NOT NULL,
	PRIMARY KEY(plan_id)
);

CREATE TABLE usr(
	user_id SERIAL,
	email VARCHAR(255) NOT NULL,
	firstname VARCHAR(50) NOT NULL,
	lastname VARCHAR(50) NOT NULL,
	username VARCHAR(50),
	pwd VARCHAR(100),
	account_type INT DEFAULT 0, /* 0 = normal user, 1 = admin */
	plan_id INT DEFAULT 0,
	created_at DATE DEFAULT CURRENT_DATE,
	is_active BOOLEAN DEFAULT TRUE,
	PRIMARY KEY(user_id),
	CONSTRAINT fk_plan_id FOREIGN KEY(plan_id) REFERENCES plan(plan_id)
);

CREATE TABLE oauth(
	oauth_id VARCHAR(64),
	user_id BIGINT UNIQUE NOT NULL,
	PRIMARY KEY(oauth_id),
	CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES usr(user_id)
);

CREATE TABLE estate(
	estate_id SERIAL,
	owner_id BIGINT NOT NULL,
	estate_name VARCHAR(100) NOT NULL,
	is_public BOOLEAN NOT NULL,
	is_online BOOLEAN NOT NULL,
	rent_or_sell VARCHAR(4) NOT NULL,
	price NUMERIC NOT NULL,
	rooms SMALLINT NOT NULL,
	bedrooms SMALLINT NOT NULL,
	bathrooms SMALLINT NOT NULL,
	description VARCHAR(5000) NOT NULL,
	square_meters NUMERIC NOT NULL,
	country CHAR(2) NOT NULL,
	city VARCHAR(50) NOT NULL,
	street VARCHAR(50) NOT NULL,
	street_number VARCHAR(50) NOT NULL,
	postcode VARCHAR(20) NOT NULL,
	floor_number SMALLINT,
	apart_number SMALLINT,
	views_count INT DEFAULT 0,
	/* constraints */
	PRIMARY KEY(estate_id),
	CONSTRAINT fk_usr_id FOREIGN KEY(owner_id) REFERENCES usr(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_estate_owner_id ON estate(owner_id);
CREATE INDEX idx_estate_is_public ON estate(is_public);
CREATE INDEX idx_estate_is_online ON estate(is_online);
CREATE INDEX idx_estate_rent_or_sell ON estate(rent_or_sell);
CREATE INDEX idx_estate_price ON estate(price);
CREATE INDEX idx_estate_rooms ON estate(rooms);
CREATE INDEX idx_estate_square_meters ON estate(square_meters);
CREATE INDEX idx_estate_country ON estate(country);
CREATE INDEX idx_estate_floor_number ON estate(floor_number);
CREATE INDEX idx_estate_apart_number ON estate(apart_number);
CREATE INDEX idx_estate_views_count ON estate(views_count);

CREATE TABLE estate_picture(
	picture_id SERIAL,
	estate_id BIGINT NOT NULL,
	id_on_disk VARCHAR(30) NOT NULL,
	PRIMARY KEY(picture_id),
	CONSTRAINT fk_estate_id FOREIGN KEY(estate_id) REFERENCES estate(estate_id) ON DELETE CASCADE
);

CREATE INDEX idx_estate_picture_estate_id on estate_picture(estate_id);
CREATE INDEX idx_estate_picture_id_on_disk on estate_picture(id_on_disk);

-- CREATE OR REPLACE FUNCTION add_estate_picture(id_on_disk VARCHAR, estate_id BIGINT) RETURNS void LANGUAGE plpgsql AS
-- $$
-- 	BEGIN
-- 		INSERT INTO estate_picture VALUES(DEFAULT, estate_id, id_on_disk);
-- 	END;
-- $$;

/* Some insert statements for testing */
INSERT INTO plan VALUES(0, 'Free', 0.00);
INSERT INTO plan VALUES(1, 'Premium', 49.99);
INSERT INTO usr(
	email,
	firstname,
	lastname,
	pwd
) VALUES(
	'kevin.andries@yahoo.fr',
	'Kevin',
	'Andries',
	'HASHEDPASSWORD'
);
INSERT INTO usr(
	email,
	firstname,
	lastname,
	pwd
) VALUES(
	'jonhualde94@gmail.com',
	'Jon',
	'Hualde',
	'HASHEDPASSWORD'
);

INSERT INTO estate VALUES(
	DEFAULT,
	1,
	'Spacious appartment in the center of Moscow.',
	true,
	true,
	'sell',
	4500000,
	8,
	3,
	2,
	'Some random description of this estate',
	147.6,
	'RU',
	'Moscow',
	'Arbeit St.',
	'174',
	'8654'
);
INSERT INTO estate_picture VALUES(DEFAULT, 1, 'M00ZQ39ADZO6R7MS2F0D');
INSERT INTO estate_picture VALUES(DEFAULT, 1, 'M00ZQ39ADZO6R7MS2F0D');

INSERT INTO estate VALUES(
	DEFAULT,
	1,
	'Beautiful penthouse in Minsk',
	false,
	true,
	'rent',
	3800000,
	6,
	2,
	2,
	'Some random description of this estate',
	98.2,
	'BY',
	'Minsk',
	'Lenina St.',
	'54',
	'220073'
);
INSERT INTO estate_picture VALUES(DEFAULT, 2, 'M00ZQ39ADZO6R7MS2F0D');
INSERT INTO estate_picture VALUES(DEFAULT, 2, 'M00ZQ39ADZO6R7MS2F0D');
INSERT INTO estate_picture VALUES(DEFAULT, 2, 'M00ZQ39ADZO6R7MS2F0D');
INSERT INTO estate_picture VALUES(DEFAULT, 2, 'M00ZQ39ADZO6R7MS2F0D');

INSERT INTO estate VALUES(
	DEFAULT,
	2,
	'Cozy condo in the suburbs of Bangkok',
	true,
	true,
	'sell',
	850000,
	4,
	3,
	2,
	'Some random description of this estate',
	87.2,
	'TH',
	'Bangkok',
	'Ping Nham Street',
	'589',
	'142'
);
INSERT INTO estate_picture VALUES(DEFAULT, 3, 'M00ZQ39ADZO6R7MS2F0D');
INSERT INTO estate_picture VALUES(DEFAULT, 3, 'M00ZQ39ADZO6R7MS2F0D');
INSERT INTO estate_picture VALUES(DEFAULT, 3, 'M00ZQ39ADZO6R7MS2F0D');

/* Select statements */
SELECT * FROM oauth;
SELECT * FROM usr ORDER BY user_id;
SELECT COUNT(*) FROM usr;
SELECT * FROM estate ORDER BY estate_id;
SELECT COUNT(*) FROM estate;
SELECT * FROM estate_picture ORDER BY estate_id;
SELECT COUNT(*) FROM estate_picture;

-- SELECT is_public FROM estate WHERE estate_id=(SELECT estate_id FROM estate_picture WHERE picture_id='M00ZQ39ADZO6R7MS2F0D');

-- Total size of DB
SELECT pg_size_pretty(pg_database_size('real-estate-crm'));
-- SELECT pg_size_pretty(pg_database_size('ddajgk4fcvai8o'));