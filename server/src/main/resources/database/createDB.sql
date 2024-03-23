CREATE TABLE IF NOT EXISTS Activities
(
    uuid           TEXT PRIMARY KEY,
    activityName   TEXT NOT NULL,
    description    TEXT,
    lengthMin      INTEGER,
    lengthMax      INTEGER,
    classStructure TEXT,
    potvrzovani    INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS Objectives
(
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    objective    TEXT NOT NULL,
    activityUUID TEXT NOT NULL,
    FOREIGN KEY (activityUUID) REFERENCES Activities (uuid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS EducationLevels
(
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    level        TEXT NOT NULL,
    activityUUID TEXT NOT NULL,
    FOREIGN KEY (activityUUID) REFERENCES Activities (uuid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Tools
(
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    tool         TEXT NOT NULL,
    activityUUID TEXT NOT NULL,
    FOREIGN KEY (activityUUID) REFERENCES Activities (uuid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS HomePreparations
(
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    title        TEXT NOT NULL,
    warn         TEXT,
    note         TEXT,
    activityUUID TEXT NOT NULL,
    FOREIGN KEY (activityUUID) REFERENCES Activities (uuid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Instructions
(
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    title        TEXT NOT NULL,
    warn         TEXT,
    note         TEXT,
    activityUUID TEXT NOT NULL,
    FOREIGN KEY (activityUUID) REFERENCES Activities (uuid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Agendas
(
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    duration     INTEGER NOT NULL,
    title        TEXT    NOT NULL,
    description  TEXT,
    activityUUID TEXT    NOT NULL,
    FOREIGN KEY (activityUUID) REFERENCES Activities (uuid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Links
(
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    title        TEXT NOT NULL,
    url          TEXT NOT NULL,
    activityUUID TEXT NOT NULL,
    FOREIGN KEY (activityUUID) REFERENCES Activities (uuid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Gallery
(
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    title        TEXT NOT NULL,
    activityUUID TEXT NOT NULL,
    FOREIGN KEY (activityUUID) REFERENCES Activities (uuid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Images
(
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    lowRes    TEXT    NOT NULL,
    highRes   TEXT    NOT NULL,
    galleryID INTEGER NOT NULL,
    FOREIGN KEY (galleryID) REFERENCES Gallery (id) ON DELETE CASCADE
);

