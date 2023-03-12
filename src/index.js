const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080;

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require('./connector')
//------------------------------------------------------

app.get("/totalRecovered",async (req,res)=>{
    const data = await connection.find();
    let sum = 0;
    for (let i of data){
        sum+=i.recovered;
    }
    res.send({data:{_id:"total",recovered:sum}});
})
//------------------------------------------------------

app.get("/totalActive",async (req,res)=>{
    const data = await connection.find();
    let sum = 0;
    for (let i of data){
        sum+=i.infected-i.recovered;
    }
    res.send({data:{_id:"total",active:sum}});
})

//------------------------------------------------------

app.get("/totalDeath",async (req,res)=>{
    const data = await connection.find();
    let sum = 0;
    for (let i of data){
        sum+=i.death;
    }
    res.send({data:{_id:"total",death:sum}});
})
//------------------------------------------------------

app.get("/hotspotStates",async (req,res)=>{
    const data = await connection.find();
    // let sum = 0;
    const arr = [];
    for (let i of data){
        const rate = (i.infected-i.recovered)/i.infected;
        if (rate>0.1){
            arr.push({state:i.state,rate:rate.toFixed(5)})
        }
    }
    res.send({data:arr});
})
//------------------------------------------------------

app.get("/healthyStates",async (req,res)=>{
    const data = await connection.find();
    // let sum = 0;
    const arr = [];
    for (let i of data){
        const rate = i.death/i.infected;
        if(rate<0.005){
            arr.push({state:i.state,mortality:rate.toFixed(4)});
        }
    }
    res.send({data:arr});
})
//------------------------------------------------------

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;