-- Basic tables

CREATE TABLE IF NOT EXISTS SECTOR (
    SEC_NOMBRE VARCHAR(60) PRIMARY KEY,
    SEC_IMG BYTEA,
    SEC_SEGURIDAD NUMERIC(3,2),
    SEC_PATH INTEGER,
    SEC_DISPONIBLE VARCHAR(2),
    CONSTRAINT sector_sec_seguridad_check CHECK (sec_seguridad >= 0::numeric AND SEC_SEGURIDAD <= 1::numeric)
);

ALTER TABLE IF EXISTS SECTOR OWNER TO segura_admin;

CREATE TABLE IF NOT EXISTS TUSUARIO (
    TU_TID SERIAL PRIMARY KEY,
    TU_TNOMBRE VARCHAR(32) NOT NULL,
    TU_DISPONIBLE VARCHAR(2) NOT NULL
);

ALTER TABLE IF EXISTS TUSUARIO OWNER TO segura_admin;

CREATE TABLE IF NOT EXISTS TPERTENENCIA (
    TPER_TID SERIAL PRIMARY KEY,
    TPER_TNOMBRE VARCHAR(20) NOT NULL,
    TPER_DISPONIBLE VARCHAR(2) NOT NULL
);

ALTER TABLE IF EXISTS TPERTENENCIA OWNER TO segura_admin;

CREATE TABLE IF NOT EXISTS TINCIDENTE (
    TIN_TID SERIAL PRIMARY KEY,
    TIN_TNOMBRE VARCHAR(12) NOT NULL,
    TIN_DISPONIBLE VARCHAR(2) NOT NULL
);

ALTER TABLE IF EXISTS TINCIDENTE OWNER TO segura_admin;

-- Now we define the tables which contain the bulk of the information

CREATE TABLE IF NOT EXISTS USUARIO (
    US_CORREO VARCHAR(40) PRIMARY KEY,
    US_FONO VARCHAR(32),
    US_CONTRASENYA VARCHAR(64) NOT NULL,
    US_DISPONIBLE VARCHAR(2) NOT NULL
);

ALTER TABLE IF EXISTS USUARIO OWNER TO segura_admin;

CREATE TABLE IF NOT EXISTS PERTENENCIA (
    PER_ID SERIAL PRIMARY KEY,
    PER_CORREO VARCHAR(40) REFERENCES USUARIO(US_CORREO),
    PER_TIPO INTEGER REFERENCES TPERTENENCIA(TPER_TID),
    PER_IMG BYTEA,
    PER_NOMBRE VARCHAR(40),
    PER_DISPONIBLE VARCHAR(2) NOT NULL
);

ALTER TABLE IF EXISTS PERTENENCIA OWNER TO segura_admin;

CREATE TABLE IF NOT EXISTS REPORTE (
    REP_ID SERIAL PRIMARY KEY,
    REP_CORREO VARCHAR(40) REFERENCES USUARIO(US_CORREO),
    REP_SECTOR VARCHAR(60) REFERENCES SECTOR(SEC_NOMBRE),
    REP_TIPO INTEGER REFERENCES TINCIDENTE(TIN_TID),
    REP_FECHA DATE,
    REP_HORA TIME
);

ALTER TABLE IF EXISTS REPORTE OWNER TO segura_admin;

-- Composition tables to normalize (N,M) relations

CREATE TABLE IF NOT EXISTS FRECUENTA (
    FREC_CORREO VARCHAR(40) REFERENCES USUARIO(US_CORREO),
    FREC_SECTOR VARCHAR(60) REFERENCES SECTOR(SEC_NOMBRE)
);

ALTER TABLE IF EXISTS FRECUENTA OWNER TO segura_admin;

CREATE TABLE IF NOT EXISTS PUSURPADA (
    PU_RID INTEGER REFERENCES REPORTE(REP_ID),
    PU_PID INTEGER REFERENCES PERTENENCIA(PER_ID)
);

ALTER TABLE IF EXISTS PUSURPADA OWNER TO segura_admin;

CREATE TABLE IF NOT EXISTS RUSUARIO (
    RU_CORREO VARCHAR(40) REFERENCES USUARIO(US_CORREO),
    RU_TIPO INTEGER REFERENCES TUSUARIO(TU_TID)
);

ALTER TABLE IF EXISTS RUSUARIO OWNER TO segura_admin;
