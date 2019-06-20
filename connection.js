"use strict";

const { Pool } = require("pg");
const credentials = ({
user: "postgres",
password: "password",
host: "localhost",
port: 5432,
database: "danceDB",
ssl: false
});

module.exports = new Pool(credentials);