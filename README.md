# GIS
NSI GIS Coding Test

## Author 
- Naufal Ihsan Pratama

## Tech Stack
- NodeJS v14.5.0
- PostgreSQL 12.4
- PostGIS 3.0

## Setup PSQL DB
```bash
CREATE DATABASE db_name;
\connect db_name;
CREATE EXTENSION postgis;
\q
```

## Installation Backend (ExpressJS)
```bash
git clone git@github.com:naufalihsan/gis.git
cd gis/backend/
```

#### Update Database Connection Config
app/config/db.config.js
```bash
module.exports = {
    HOST: "localhost",
    USER: "YOUR_DB_USER",
    PASSWORD: "YOUR_DB_PASSWORD",
    DB: "YOUR_DB_NAME",
    dialect: "postgres"
};
```

#### Run Application
App listening at http://localhost:3000
```bash
npm install
npm start
```

#### REST API
Docs : [API Docs](https://documenter.getpostman.com/view/6304914/TVK5bLjy)

## Installation Frontend
open gis/frontend/index.html on your browser