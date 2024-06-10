# PandaPop MERN Shopping Application
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
## Table of Contents
- [PandaPop MERN Shopping Application](#pandapop-mern-shopping-application)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Scripts](#scripts)
  - [Technologies](#technologies)
  - [Credits](#credits)

## Description
This is a full-stack MERN (MongoDB, Express, React, Node.js) application for a shopping platform. The application includes user authentication, product browsing, and Stripe for payment processing.

## Installation
Follow these steps to set up the project on your local machine:
  1. Clone the repository: "git clone https://github.com/amandrews09/PandaPop.git"
  2. Install Dependencies. The project is divided into two parts: the server and the client.
   You can install all dependencies for both parts with a single command: "npm run install" This command will navigate to the server and client directories and install the respective dependencies.

## Usage
Starting the Application
 1. Development Mode --
    To run the application in development mode, use the following command: "npm run develop" This command will concurrently run the server and the client using nodemon for the server and vite for the client.
 2. Production Mode --
    To build and run the application in production mode: "npm run build" then "npm run start" This will build the client-side code and start the server.
 3. Seeding the Database --
    To seed the database with initial data, run the following command: "npm run seed"

## Scripts
Here is a list of all the scripts available in this project:

    start: Starts the server from the server directory.
    develop: Runs both the client and server concurrently in development mode.
    install: Installs all dependencies for both the server and client.
    seed: Seeds the database with initial data.
    build: Builds the client-side code.

## Technologies
Server Side

    Node.js
    Express
    MongoDB with Mongoose
    GraphQL with Apollo Server
    bcrypt for password hashing
    jsonwebtoken for authentication
    Stripe for payment processing
Client Side

    React
    React Router DOM
    Apollo Client
    Stripe.js
    Bootstrap with React-Bootstrap
    Vite for development and build tooling
    ESLint for linting
    Vitest for testing

## Credits
The Winged Coders: Michael, Mallory, Josh, Sarah, Amanda
