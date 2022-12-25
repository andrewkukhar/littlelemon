const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
const port = procces.env.PORT || 5000;

app.use(bodyParser.json());

// Set up MongoDB connection.
const uri = "mongodb+srv://LittleLemon:LittleLemon@cluster0.xt8ni2b.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("littlelemon").collection("bookings");

    // Set up API endpoint.
    app.post('/bookings', (req, res) => {
        // Validate request data.
        if (!req.body.date || !req.body.time || !req.body.people) {
            return res.status(400).send({ error: 'Invalid request data' });
        }
        // Insert booking data into database.
        collection.insertOne({ date: req.body.date, time: req.body.time, people: req.body.people }, (error, result) => {
            if (error) {
                return res.status(500).send({ error: 'Error inserting booking data' });
            }
            res.send({ message: 'Booking created successfully' });
        });
    });

    app.listen(port, () => {
        console.log(`Booking API listening on port ${port}`);
    });
});