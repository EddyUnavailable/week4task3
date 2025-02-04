import express from "express"
import cors from "cors"
import pg from "pg"
import dotenv from "dotenv"
const port = process.env.port || 8080;

const express = require('express')

// allow incomming requests from other people 
app.use(cors())
// read incomming json
app.use(express.json())
// goes and looks for a .env file and pulls those environment variables into our node process
dotenv.config()
let env = process.env.NODE_ENV || "development";
let config = require("./config")[env];

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const hostname = config.server.host;


app.post("/", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);

  axios
    .get("https://uselessfacts.jsph.pl/random.json")
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error.response);
    });
});

app.listen(1337, function(){
  console.log('Express listening on port', this.address().port);
});
