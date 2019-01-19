// const { connection: db } = require('./db/db');
const { client: db } = require('./db/db')
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const categoriesRouter = require('./routes/category.routes');
const productsRouter = require('./routes/product.routes');

// STATIC FILES
app.use(express.static(path.join(__dirname, '..', 'public')));

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json())

app.use(cors());

// ROUTES
// app.use('/categories', categoriesRouter);
// app.use('/products', productsRouter);

//REFACTORED
// Create / POST - create a new item
//post a new product
// Update / PUT - update an item
//update a new category
// Delete / DELETE - delete an item
//delete a product

app.get('/products/:name', (req, res) => {
  const productName = req.params.name;
  const sql = 'SELECT * from products where name LIKE ($1)';
  db.query(sql, [productName], (error, results) => {
    if (error) {
      res.send(error);
    } else {
      console.log(results);
      res.send(results);
    }
  })
})
app.post('/products', (req, res) => {
  console.log(req.body);
  // var values = [];
  // values.push(req.body.name);
  // console.log(values)
  var createdAt = new Date(Date.now());
  var updatedAt = new Date(Date.now());
  var sql = `insert into products(name, "createdAt", "updatedAt") values ($1,$2,$3);`
  // var sql = `INSERT INTO products (name) VALUES ($1)`;
  db.query(sql, [req.body.name, createdAt, updatedAt], (err, data) => {
    if (err) {
      console.log("MUFFINS");
      throw (err);
    }
    var newTime = new Date(Date.now());
    var totalTime = newTime - createdAt;
    console.log("TOTAL TIME TOOK:", totalTime);
    res.status(201).send(`Product added`)
  })
})

app.put('/products/:name', (req, res) => {
  const sql = `UPDATE products set name = ($1) where name = ($2)`
  db.query(sql, [req.body.name, req.params.name], (err, data) => {
    if (err) {
      throw (err);
    }
    res.status(201).send('Product changed');
  })
})

app.delete('/products/:id', (req, res) => {
  const sql = 'DELETE from products WHERE id = ($1)';
  db.query(sql, [req.params.id], (err, data) => {
    if (err) {
      throw (err);
    }
    res.status(201).send('Product deleted');
  })
})



// 404
app.use((req, res) => {
  res.status(404).send('Not found');
});


module.exports = app;
