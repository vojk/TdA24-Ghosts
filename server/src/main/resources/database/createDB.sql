CREATE TABLE
  emails (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(120) NOT NULL
  );

CREATE TABLE
  location (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    city VARCHAR(127) NOT NULL
  );

CREATE TABLE
  prefixes (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    tel_prefix INTEGER NOT NULL
  );

CREATE TABLE
  tags (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(64) NOT NULL
  );

CREATE TABLE
  telephone_nums (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_prefix INTEGER NOT NULL,
    telephone INTEGER NOT NULL,
    FOREIGN KEY (id_prefix) REFERENCES prefixes (id)
  );

CREATE TABLE
  titles (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
  tags_ucitele (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_tag INTEGER NOT NULL,
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