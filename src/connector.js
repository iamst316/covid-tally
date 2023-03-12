
//const mongodb = require('mongodb');

const mongoURI = "mongodb://localhost:27017" + "/covidtally"
const atlas ="mongodb+srv://iamst316:iamst316@cluster0.07lzs0k.mongodb.net/?retryWrites=true&w=majority";

let mongoose = require('mongoose');
const { tallySchema } = require('./schema')


mongoose.connect(atlas, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("connection established with mongodb server online"); })
    .catch(err => {
        console.log("error while connection", err)
    });
collection_connection = mongoose.model('covidtally', tallySchema)


exports.connection = collection_connection;
