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
    app.use(express.json())
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
    app.post('/login', (req, response) => {
        response.header("Access-Control-Allow-Origin", "*");
        const query = req.body.body;
        const email = query.email;
        const password = query.password;
        client.query(`SELECT * FROM userdetails WHERE "Email" = $1 AND "Password" = $2`, [email, password], (err, res) => {
            if (!err) {
                if (res.rows.length === 0) response.send('No user Found');
                else response.send(res.rows);
            } else console.log(err.message), response.send(err.message);
        });
    })


    app.post('/register', (req, response) => {
        response.header("Access-Control-Allow-Origin", "*");
        const query = req.body.body;
        let email = query.email;
        let password = query.password;
        //INSERT INTO "userdetails" VALUES
        //('Abhishek','Zade','zadeabhi55@gmail.com','9923930135','No','No','9850373210','Hacker@55');

        client.query(`SELECT * FROM userdetails WHERE "Email" = $1 AND "Password" = $2`, [email, password], (err, res) => {
            if (!err) {
                if (res.rows.length !== 0) {
                    response.send("Already a User");
                    return;
                }
            } else console.log(err.message), response.send(err.message);
        });
        email = `${query.email}`;
        password = `${query.password}`;
        let FirstName = `${query.firstName}`;
        let LastName = `${query.lastName}`;
        let phoneNo = `${query.phoneNo}`;
        let medicaCon = `${query.medicalCondition}`;
        let medicine = `${query.medicines}`;
        let emergncyCo = `${query.emergencyContact}`;
        //console.log(email, password, FirstName, LastName, phoneNo, medicaCon, medicine, emergncyCo);
        client.query(`INSERT INTO "userdetails" VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`, [FirstName, LastName, email, phoneNo, medicaCon, medicine, emergncyCo, password], (err, res) => {
            if (!err) {
                response.send("SuccessFull Submited");
            } else console.log(err.message), response.send(err.message);
        });
    })
});

// GET method route