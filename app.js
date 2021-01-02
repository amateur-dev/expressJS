const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');

const routes = require('./routes');
const sequelize = require('./utils/database');
const ProductModel = require('./models/productModel')
const UserModel = require('./models/userModel')

const app = express();

app.set("view engine", "pug");
app.set("views", "views")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", routes);
// app.use((req, res, next) => {
//     res.status(404).render('404', { pageTitle: 'Page Not Found' });
// })

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

ProductModel.belongsTo(UserModel, { constraints: true, onDelete: "CASCADE" })
UserModel.hasMany(ProductModel);

sequelize.sync().then((res) => {
    return UserModel.findByPk(1)
}).then(user => {
    if (!user) {
        return UserModel.create({
            name: "Dipesh",
            email: "dipeshsukhani@gmail.com"
        })
    }
    return Promise.resolve(user);
}).then(
    user => {
        // console.log(user);
        app.listen(3000, () => {
            console.log("Example app listening at http://localhost:3000")
        })
    }
).catch((err) => {
    console.error(err)
});

