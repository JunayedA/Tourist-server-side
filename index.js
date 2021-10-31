const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.swu9d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('online_travel_site');
        const serviceCollection = database.collection('services');
        const orderCollection = database.collection('orders');

        //GET services API
        app.get('/services', async (req, res) => {
            const cursor = serviceCollection.find({});
            const page = req.query.page;
            const size = parseInt(req.query.size);
            let services;
            const count = await cursor.count();

            if (page) {
                services = await cursor.skip(page * size).limit(size).toArray();
            }
            else {
                services = await cursor.toArray();
            }

            res.send({
                count,
                services
            });
        });

        // Use POST to get data by keys
        app.post('/services/byKeys', async (req, res) => {
            const keys = req.body;
            const query = { key: { $in: keys } }
            const services = await serviceCollection.find(query).toArray();
            res.send(services);
        });

        // Add Orders API
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.json(result);
        })
        
        app.post('/booking', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.json(result);
        })
        app.post('/bookingDetails', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.json(result);
        })
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('travel site server is running');
});

app.listen(port, () => {
    console.log('Server running at port', port);
})