// const { connection: db } = require('./db/db');
const { client: db } = require('./db/db')
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
// var { cache } = require('./db/db.js');


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
  const sql = 'SELECT * from products where name LIKE ($1) LIMIT 5';
  db.query(sql, [productName], (error, results) => {
    if (error) {
      res.send(error);
    } else {
      console.log(results);
      res.send(results);
    }
  })
})

// app.get('/products/:name', (req, res) => {
//   var query = req.params.name.toLowerCase();

//   cache.exists(query)
//   .then(exists => {
//     if (exists) {
//       return cache.get(query);
//     } else {
//       console.log(exists);
//       return Promise.resolve(false);
//     }
//   })
//   .then(products => {
//     if (products) {
//       res.status(200).send({ products: JSON.parse(products) });
//       return Promise.resolve(true);
//     } else {
//       return Promise.resolve(false)
//     }
//   })
//   .then(responseWasSent => {
//     if(!responseWasSent) {
//       // return Product.find({name: new RegExp(`^${query}`)}).limit(5)
//       const productName = req.params.name;
//       const sql = 'SELECT * from products where name LIKE ($1) LIMIT 5';
//       db.query(sql, [productName], (error, results) => {
//         if (error) {
//           res.send(error);
//         } else {
//           console.log(results);
//           res.send(results);
//           return results;
//         }
//       })
//     } else {
//       return Promise.resolve("Response was sent");
//     }
//   })
//   .then(products => {
//     if (products.length === 0) {
//       // return Product.find({name: new RegExp(query)}).limit(5)
//       const productName = req.params.name;
//       const sql = 'SELECT * from products where name LIKE ($1) LIMIT 5';
//       db.query(sql, [productName], (error, results) => {
//         if (error) {
//           res.send(error);
//         } else {
//           console.log(results);
//           res.send(results);
//           return results;
//         }
//       })
//     } else if (products === "Response was sent") {
//       return Promise.resolve(false);
//     } else {
//       cache.set(query, JSON.stringify(products));
//       res.status(200).send({ products });
//       return Promise.resolve(false);
//     }
//   })
//   .then(products => {
//     if(products) {
//       cache.set(query, JSON.stringify(products));
//       res.status(200).send({ products });
//     }
//   })
//   .catch(err => {
//     res.status(500).send({ err });
//   });


// })

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

app.get('/loaderio-b0089252821ad09cc0de0860ae64dc74.txt', (req, res) => {
  res.send('loaderio-b0089252821ad09cc0de0860ae64dc74');
})


// 404
app.use((req, res) => {
  res.status(404).send('Not found');
});


module.exports = app;
