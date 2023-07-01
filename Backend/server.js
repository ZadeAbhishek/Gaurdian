const http = require('http');
const port = 8080;
const { Client } = require('pg');
const express = require('express')
const app = express()
const cors = require('cors');


const credentials = {
    user: "postgres",
    host: "localhost",
    database: "gaurdian",
    password: "pass@123",
    port: 5432,
}

const client = new Client(credentials);
client.connect();
app.listen(port, function(error) {

    //Check if error occurs while listining port
    if (error) console.log("Something is Wrong:", error);
    else console.log("Server is Listening on port:" + port);
    app.use(cors());
    app.get('/', (req, reactResponse) => {
        reactResponse.header("Access-Control-Allow-Origin", "*");
        const query = req.query;

        // Default 
        if (query.search === '' && query.area === 'All') {
            client.query('SELECT * FROM hospital', (err, res) => {
                if (!err) reactResponse.send(res.rows)
                else console.log(err.message), reactResponse.send(err.message);
            });
        }

        // name With all
        if (query.search.length >= 1 && query.area === 'All') {
            let q = `${query.search}%`;
            client.query(`SELECT * FROM hospital WHERE "Name" LIKE $1`, [q], (err, res) => {
                if (!err) reactResponse.send(res.rows)
                else console.log(err.message), reactResponse.send(err.message);
            });
        }

        if (query.search.length >= 1 && query.area !== 'All') {
            let q = `${query.search}%`;
            let a = `${query.area}`;
            client.query(`SELECT * FROM hospital WHERE "Name" LIKE $1 AND "Area" = $2`, [q, a], (err, res) => {
                if (!err) reactResponse.send(res.rows)
                else console.log(err.message), reactResponse.send(err.message);
            });
        }

        if (query.search === '' && query.area !== 'All') {
            let a = `${query.area}`;
            client.query(`SELECT * FROM hospital WHERE "Area" = $1`, [a], (err, res) => {
                if (!err) reactResponse.send(res.rows)
                else console.log(err.message), reactResponse.send(err.message);
            });
        }

    })

    app.get('/testdb', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.send('GET request to the homepage')
        console.log(req.query);
    })

    // POST method route
    app.post('/', (req, res) => {
        res.send('POST request to the homepage')
        console.log(req);
    })
});

// GET method route