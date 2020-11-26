CREATE TABLE zipcode (
	zipcode VARCHAR(8) NOT NULL,
	city varchar(500) NOT NULL,
	street varchar(500) NULL,
	neighborhood varchar(500) NULL,
	state varchar(2) NOT NULL,
	CONSTRAINT zipcode_PK PRIMARY KEY (zipcode)
)
ENGINE=InnoDB
DEFAULT CHARSET=latin1
COLLATE=latin1_bin;

INSERT INTO zipcode
(zipcode, city, street, neighborhood, state)
VALUES('99560000', 'Sarandi', 'Avenida Expedicionario', 'Centro', 'RS');

INSERT INTO zipcode
(zipcode, city, street, neighborhood, state)
VALUES('01408000', 'São Paulo', 'Alameda Casa Branca', 'Jardim Paulista', 'SP');

INSERT INTO zipcode
(zipcode, city, street, neighborhood, state)
VALUES('01408001', 'São Paulo', 'Alameda Casa Branca', 'Jardim Paulista', 'SP');

INSERT INTO zipcode
(zipcode, city, street, neighborhood, state)
VALUES('01228000', 'São Paulo', 'Avenida Angélica', 'Santa Cecília', 'SP');

INSERT INTO zipcode
(zipcode, city, street, neighborhood, state)
VALUES('01228200', 'São Paulo', 'Avenida Angélica', 'Santa Cecília', 'SP');

Commit;

