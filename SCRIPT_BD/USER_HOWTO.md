# First steps
It is assumed that the user reading this guide has elementary
knowledge of SQL databases, and has a PostgreSQL environment set-up.
If the latter is not true for you, then it is highly recommended that
you follow the steps outlined in the official documentation: 

[PostgreSQL Installation](https://www.postgresql.org/docs/current/tutorial-install.html)

To set up the database and administrator, first you must connect
to your system's PostgreSQL root user. This can be achieved in
most UNIX-like OS's by running:

    sudo -i -u postgres

This will spawn a shell as the *postgres* user. In this shell, run

    `psql`

to enter the PostgreSQL CLI environment and continue to the next part.

## Understanding the set-up scripts.

There are four scripts provided:

- `./create.sql` creates the DB's administrator, the DB itself
and grants the administrator all privileges, most importantly
the right to connect to the database.
- `./grant.sql` grants the administrator privileges *within* the
database public schema. This is an important distinction, if you do not run this script,
you will not be able to alter tables, query information, update, etc.
- `./tables.sql` creates the databases' tables, constraints and relations. This is
fairly straightforward and does not require much explanation.
- `./populate.sql` adds rows to each table. It is a good starting point to get the app
working and test out its features.

# Running the scripts

In the CLI environemnt you set up in the first section, do the following, strictly in this order:

- Run the `./create.sql` script. This can be achieved by simply copy-pasting
the script directly into the PostgreSQL CLI.
- **IMPORTANT**. Run `\c usach_segura` before running *any* other script. This will
connect you to the newly created database. If you skip this step, the following scripts
will be run in the *postgres* public schema instead of the new DB's, which can be very difficult to undo.
You will know that `\c usach_segura` has succeeded because the command prompt will change to the
correct database's name.
- Run `./grant.sql`.
- Run `./tables.sql`.
- Run `./populate.sql`.

# Finishing up
Now the *usach_segura* database is fully set-up and operational. You may logout of the PosgreSQL CLI
by pressing CTRL+D on your keyboard or typing `\q` in the command line, or you can view/manipulate
the database through PostgreSQL queries. You may also change the administrator's credentials, but
be careful to update them in the project's `credentials.js` file, or the application will not be
able to connect to the database.
