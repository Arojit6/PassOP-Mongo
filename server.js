/* eslint-disable no-undef */
const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
let dotenv = require('dotenv')
dotenv.config()
console.log(process.env.MONGO_URI) ;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());


// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
// eslint-disable-next-line no-unused-vars
const client = new MongoClient(url);

// Database Name
// eslint-disable-next-line no-unused-vars
const dbName = 'passop';


const port  = 3000


 client.connect();

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});


app.get('/', async(req, res) => { 
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);

})
app.post('/', async(req, res) => { 
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    // eslint-disable-next-line no-unused-vars
    const findResult = await collection.insertOne(password );
    res.send({
        success: true ,
        result: findResult
    });

})

app.delete('/', async(req, res) => { 
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    // eslint-disable-next-line no-unused-vars
    const findResult = await collection.deleteOne(password );
    res.send({
        success: true ,
        result: findResult
    });

}
);