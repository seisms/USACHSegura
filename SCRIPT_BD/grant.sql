-- Grant privileges to user. This must all
-- be done while connected to the database

GRANT ALL PRIVILEGES ON SCHEMA public TO segura_admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO segura_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO segura_admin;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO segura_admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO segura_admin;
