# USACH Segura
USACH Segura is a web-application result of a biannual project done by
students of the Universidad de Santiago de Chile. It allows students,
officials and academics of the university to report and visualize
robberies and similar incidents within the establishment in a
quick, agile manner. This is done as a student project and has no
official affiliation with the Universidad de Santiago de Chile.

## Navigating the project.

- `./SOFTWARE/`: This directory contains everything necessary to run the application.
It is divided in `frontend/` and `backend/` subdirectories, each handling their
respective side of the web-app.
- `./SCRIPT_BD/`: This directory contains both scripts and instructions in how to
set-up the database used by USACH Segura. It is *highly* recommended that you both
read and follow these instructions before continuing any further below.
- `./DOCUMENTACION`: Contains five progress reports pertaining to the five design
phases of the project carried out throghout the semester.
- `./PRESENTACION`: Contains five presentations pertaining to the five design
phases of the project carried out throghout the semester.


The following sections are aimed at anyone who wishes to run the project in their own
system.

# Setting up your own instance
Before procceeding, you must ensure that the following dependencies
are installed and working on your system:

- NodeJS.
- PosgreSQL

Then, clone the project with

    git clone https://github.com/seisms/USACHSegura.git

and follow the instructions below. Remember to set up the database beforehand
following the procedure outlined in `./SCRIPT_BD/USER_HOWTO.md`.

## Frontend
To set up the frontend, navigate to the relevant directory in `./SOFTWARE/frontend/`, then run
`./npm install` to resolve the project's dependencies.

## Backend
To set up the backend, navigate to the relevant directory in `./SOFTWARE/backend/`, then run
`./npm install` to resolve the project's dependencies.

# Running the instance.
Once everything is set up, run `node index.js` in the backend directory, and `npm run dev` in the frontend directory.
You can then visit the URL that will appear in the frontend CLI to utilize the application.
