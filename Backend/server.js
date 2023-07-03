const http = require('http');
const port = 8080;
const { Client } = require('pg');
const express = require('express')
const app = express()
const cors = require('cors');

// DataBase Creds
const credentials = {
    user: "postgres",
    host: "localhost",
    database: "gaurdian",
    password: "pass@123",
    port: 5432,
}

// Instance of DB Client 
const client = new Client(credentials);

// Connect to DB Client
client.connect();

// Server init
app.listen(port, function(error) {

    //Check if error occurs while listining port
    if (error) console.log("Something is Wrong:", error);
    else console.log("Server is Listening on port:" + port);

    // For CORS Header
    app.use(cors());

    // Post request JSON parsing
    app.use(express.json())

    // Get request for Search engine
    app.get('/', (req, reactResponse) => {
        reactResponse.header("Access-Control-Allow-Origin", "*");
        const query = req.query;

        //  search for all data without parameter
        if (query.search === '' && query.area === 'All') {
            client.query('SELECT * FROM hospital', (err, res) => {
                if (!err) reactResponse.send(res.rows)
                else console.log(err.message), reactResponse.send(err.message);
            });
        }

        // Search for all data with paramter
        if (query.search.length >= 1 && query.area === 'All') {
            let q = `${query.search}%`;
            client.query(`SELECT * FROM hospital WHERE "Name" LIKE $1`, [q], (err, res) => {
                if (!err) reactResponse.send(res.rows)
                else console.log(err.message), reactResponse.send(err.message);
            });
        }


        // Search for select region with parameter
        if (query.search.length >= 1 && query.area !== 'All') {
            let q = `${query.search}%`;
            let a = `${query.area}`;
            client.query(`SELECT * FROM hospital WHERE "Name" LIKE $1 AND "Area" = $2`, [q, a], (err, res) => {
                if (!err) reactResponse.send(res.rows)
                else console.log(err.message), reactResponse.send(err.message);
            });
        }


        // search for selected region without parameter
        if (query.search === '' && query.area !== 'All') {
            let a = `${query.area}`;
            client.query(`SELECT * FROM hospital WHERE "Area" = $1`, [a], (err, res) => {
                if (!err) reactResponse.send(res.rows)
                else console.log(err.message), reactResponse.send(err.message);
            });
        }

    })


    // Get user Details 
    app.post('/details', (req, reactResponse) => {
        reactResponse.header("Access-Control-Allow-Origin", "*");
        let query = req.body.params;
        let email = query.email;
        let password = query.password;
        client.query(`SELECT * FROM userdetails WHERE "Email" = $1 AND "Password" = $2`, [email, password], (err, res) => {
            if (!err) reactResponse.send(res.rows)
            else console.log(err.message), reactResponse.send(err.message);
        });
    })


    // change User details
    app.post('/details/change', (req, reactResponse) => {
        reactResponse.header("Access-Control-Allow-Origin", "*");
        let query = req.body.params;
        let email = query.email;
        let password = query.password;
        let firstName = query.firstName;
        let lastName = query.lastName;
        let phoneNo = query.phoneNo;
        let emergency = query.emergency;
        client.query(`UPDATE "userdetails"
        SET "FirstName" = $1, "LastName"=$2,"PhoneNo"=$3,"EmergencyCo"=$4
        WHERE "Email" = $5AND "Password" = $6`, [firstName, lastName, phoneNo, emergency, email, password], (err, res) => {
            if (!err) reactResponse.send(res)
            else console.log(err.message), reactResponse.send(err.message);
        });
    })

    // User Lgoin
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


    // Register user 
    app.post('/register', (req, response) => {
        response.header("Access-Control-Allow-Origin", "*");
        const query = req.body.body;
        let email = query.email;
        let password = query.password;
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
        client.query(`INSERT INTO "userdetails" VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`, [FirstName, LastName, email, phoneNo, medicaCon, medicine, emergncyCo, password], (err, res) => {
            if (!err) {
                response.send("SuccessFull Submited");
            } else console.log(err.message), response.send(err.message);
        });
    })
});