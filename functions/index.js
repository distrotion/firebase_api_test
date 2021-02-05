const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require("body-parser")
const cors = require('cors');
const app = express();


const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.database();

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());
app.use(cors())

var ref = db.ref("parin");

app.get('/test_function', (req, res) => {
    res.json({"msg":"KUY PARIN"});
});

app.post('/push', (req, res) => {    
    input = req.body;

    if(input.key === "Kuy_Parin"){
        ins=ref.push(input);
        resp="update_complete"
    }else {
        resp="sam tig long"
    }
    
    res.json({"msg":resp});
});

app.post('/get', (req, res) => {
    input = req.body;

    if(input.key === "Kuy_Parin"){
        data_get =ref.get();
        resp=data_get 
    }else {
        resp="sam tig long"
    }
    
    res.json(resp);
});


exports.test = functions.https.onRequest(app)
