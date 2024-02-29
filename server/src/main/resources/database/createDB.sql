CREATE TABLE
  emails (
    id INTEGER NOT NULL PRIMARY KEY,
    email VARCHAR(120) NOT NULL
  );

CREATE TABLE
  location (
    id INTEGER NOT NULL PRIMARY KEY,
    city VARCHAR(127) NOT NULL
  );

CREATE TABLE
  prefixes (
    id INTEGER NOT NULL PRIMARY KEY,
    tel_prefix VARCHAR(4) NOT NULL
  );

CREATE TABLE
  reservation (
    uuid VARCHAR(36) NOT NULL PRIMARY KEY,
    date_of_reserv DATE NOT NULL,
    from_time INTEGER NOT NULL,
    to_time INTEGER NOT NULL,
    id_location INTEGER NOT NULL,
    FOREIGN KEY (id_location) REFERENCES location (id)
  );

CREATE TABLE
  tags (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(64) NOT NULL
  );

CREATE TABLE
  telephone_nums (
    id INTEGER NOT NULL PRIMARY KEY,
    id_prefix INTEGER NOT NULL,
    telephone VARCHAR(12) NOT NULL,
    FOREIGN KEY (id_prefix) REFERENCES prefixes (id)
  );

CREATE TABLE
  titles (
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(32) NOT NULL
  );

CREATE TABLE
  ucitele (
    uuid VARCHAR(36) NOT NULL PRIMARY KEY,
    id_title_before INTEGER,
    id_title_after INTEGER,
    id_location INTEGER,
    first_name VARCHAR(64) NOT NULL,
    middle_name VARCHAR(32),
    last_name VARCHAR(32) NOT NULL,
    picture_url VARCHAR(255),
    claim VARCHAR(512),
    bio TEXT,
    price_per_hour INTEGER,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(4096),
    FOREIGN KEY (id_title_before) REFERENCES titles (id),
    FOREIGN KEY (id_title_after) REFERENCES titles (id),
    FOREIGN KEY (id_location) REFERENCES location (id)
  );

CREATE TABLE
  email_ucitel (
    id_email INTEGER NOT NULL,
    id_ucitel VARCHAR(36) NOT NULL,
    CONSTRAINT pk_email_ucitel PRIMARY KEY (id_email, id_ucitel),
    FOREIGN KEY (id_email) REFERENCES emails (id),
    FOREIGN KEY (id_ucitel) REFERENCES ucitele (uuid)
  );

CREATE TABLE
  reservation_tag (
    uuid_reversation VARCHAR(36) NOT NULL,
    uuid_tags VARCHAR(36) NOT NULL,
    CONSTRAINT pk_reservation_tag PRIMARY KEY (uuid_reversation, uuid_tags),
    FOREIGN KEY (uuid_reversation) REFERENCES reservation (uuid),
    FOREIGN KEY (uuid_tags) REFERENCES tags (id)
  );

CREATE TABLE
  reservation_ucitele (
    uuid_ucitele VARCHAR(36) NOT NULL,
    uuid_reservation VARCHAR(36) NOT NULL,
    CONSTRAINT pk_reservation_ucitele PRIMARY KEY (uuid_ucitele, uuid_reservation),
    FOREIGN KEY (uuid_ucitele) REFERENCES ucitele (uuid),
    FOREIGN KEY (uuid_reservation) REFERENCES reservation (uuid)
  );

CREATE TABLE
  tags_ucitele (
    id INTEGER NOT NULL PRIMARY KEY,
    id_tag VARCHAR(36) NOT NULL,
    id_ucitel VARCHAR(36) NOT NULL,
    FOREIGN KEY (id_tag) REFERENCES tags (id),
    FOREIGN KEY (id_ucitel) REFERENCES ucitele (uuid)
  );

CREATE TABLE
  telephone_ucitel (
    id_tel INTEGER NOT NULL,
    id_ucitel VARCHAR(36) NOT NULL,
    CONSTRAINT pk_telephone_ucitel PRIMARY KEY (id_tel, id_ucitel),
    FOREIGN KEY (id_ucitel) REFERENCES ucitele (uuid),
    FOREIGN KEY (id_tel) REFERENCES telephone_nums (id)
  );