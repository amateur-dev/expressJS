const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');

const app = express();

const routes = require('./routes');

const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", routes);
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
})

// app.get('/add-product', (req, res, next) => {
//     res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
// })

// app.use('/product', (req, res, next) => {
//     console.log(req.body);
//     Object.keys(req.body).length === 0 ? res.redirect('/') : res.send(req.body);
// });

// app.get('/', (req, res, next) => {
//     res.send('<h1>Hello from Express!</h1>');
// });


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