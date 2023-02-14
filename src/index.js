const express = require('express');
const corn = require('node-cron');
const moment = require('moment');
const app = express();

app.use(express.json());

app.post('/schedule', start)

app.listen(3000, (err)=>{
    if(err) console.log(err.message);
    console.log("App is running...");
});

const x = function (text, dateTime) {
    let s = dateTime.split(" ");
    let s1 = s[0].split("/").join(" ");
    let s2 = s[1].split(":").reverse().join(" ");
    s = s2+" "+s1;
    corn.schedule(s+' *', ()=>{
        console.log('Reminder', moment().format('DD:MM:YYYY HH:MM:SS', dateTime), text);
    });
}

function start(req,res){
    try {
        const { text, dateTime} = req.body;
        if(!text) return res.status(400).send({status: false, message: "text is required."});
        if(!dateTime) return res.status(400).send({status: false, message: "dateTime is required."});
        x(text, dateTime);
        res.status(200).send({status: true, message: "Your task is Scheduled."});
    } catch (error) {
        res.status(500).send({status: false, message: error.message});
    }
}

const moment = require('moment');
console.log(moment("13/02/2023 15:57:20", 'DD/MM/YYYY HH:MM:SS').isValid());