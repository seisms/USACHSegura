-- Create user, database and grant the user permissions
-- in that database

CREATE USER segura_admin WITH PASSWORD 'segura2024';
CREATE DATABASE usach_segura;

GRANT ALL PRIVILEGES ON DATABASE usach_segura TO segura_admin;

