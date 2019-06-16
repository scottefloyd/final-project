"use strict";

const express = require("express");
const pool = require("./connection");
const routes = express.Router();

function selectAll(res) {
  pool
    .query("select * from competitors order by id")
    .then(result => res.json(result.rows));
}

routes.get("/competitors", (req, res) => {
  selectAll(res);
});

routes.post("/competitors", (req, res) => {
  pool
    .query(
      "insert into competitors (player_name, current_competitor, style, skill, originality, effort) VALUES ($1::text, $2::boolean, $3::int, $4::int, $5::int, $6::int)",
      [
        req.body.player_name,
        req.body.current_competitor,
        req.body.style,
        req.body.skill,
        req.body.originality,
        req.body.effort
      ]
    )
    .then(() => {
      selectAll(res);
    });
});

routes.put("/competitors/:id", (req, res) => {
  pool
    .query(
      "UPDATE competitors SET player_name=$1::text, current_competitor=$2::boolean, style=$3::int, skill=$4::int, originality=$5::int, effort=$6::int where id=$7::int",
      [
        req.body.player_name,
        req.body.current_competitor,
        req.body.style,
        req.body.skill,
        req.body.originality,
        req.body.effort,
        req.params.id
      ]
    )
    .then(() => {
      selectAll(res);
    });
});

routes.delete("/competitors/:id", (req, res) => {
  pool
    .query("delete from competitors where id=$1::int", [req.params.id])
    .then(() => {
      selectAll(res);
    });
});

module.exports = routes;
