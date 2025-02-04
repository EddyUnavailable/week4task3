import express from "express"
import cors from "cors"
import pg from "pg"
import dotenv from "dotenv"

// instastiate my app 
const app = express()

// do my 'use'
// allow incomming requests from other people 
app.use(cors())
// read incomming json
app.use(express.json())

// goes and looks for a .env file and pulls those environment variables into our node process
dotenv.config()

// a pool is a way for our express app to connect to our database
// I'll give it a connnection string so that I can connect to *my* database
const db = new pg.Pool({
    connectionString: process.env.DB_CONN
})

fetch('https://api.example.com/users') // Replace with your API URL

    .then(response => {

        if (!response.ok) {

            throw new Error('Network response was not ok');

        }

        return response.json(); 

    })

    .then(data => {

        console.log(data); // Now you have the fetched user data as a JavaScript object

    })

    .catch(error => {

        console.error('Error fetching data:', error);

    });