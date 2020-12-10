const express = require('express')
const app = express()
const port = 3000

app.get('/users', (req, res) => {
    res.send({ userName: "Dipesh" });
})

app.get('/', (req, res) => {
    res.send("Hi there!");
})

// app.get('/', (req, res, next) => {
//     console.log("this is middleware1");
//     next();
// })

// app.use((req, res, next) => {
//     console.log("this is middleware2");
//     next();
// })

// app.use((req, res) => {
//     res.send('Hello World from the last block');
// })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})