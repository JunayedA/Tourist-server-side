const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//user: assignment10dbuser
//pass: sthxBPLWmDNDbQAr

const uri = "mongodb+srv://assignment10dbuser:sthxBPLWmDNDbQAr@cluster0.eylgj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log('hitting the data base')
  client.close();
});

app.get('/', (req, res) =>{
    res.send('Running my CRUD server');
});

app.listen(port, () =>{
    console.log("running server on port", port)
})