const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const counterEvent = new Map();


app.get("/api/events", (request, response)=> {
    const key = getKey();
    const counter = counterEvent.get(key);
    response.status(200).send(counterEvent.get(key)|| {});
});

app.post("/api/events", (request,response) =>{
    const key = getKey();
    let counter = counterEvent.get(key);
    if (!counter) {
        counter = {"date": key, "total":0};
    }
    counter.total = counter.total +1;
    counterEvent.set(key, counter);
    response.status(201).send("Event recived!");

});

app.patch("/api/events/reset", (resquet, response) =>{
    const key = getKey();
    counterEvent.set(key, {"date": key, "total":0});
    response.status(200).send("Counter reseted");
});

function getKey() {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth()}-${today.getDay()}`;
}

app.listen(PORT, ()=>{
    console.log(`API is listening on port ${PORT}`);
});
