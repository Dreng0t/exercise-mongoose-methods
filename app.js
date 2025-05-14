const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const Pizza = require('./models/Pizza.model');

const app = express();

const PORT = 3000;
const DB_URL =
  'mongodb+srv://bob:supersecretpassword@cluster0.tiknp.mongodb.net/ih-exercise-mongoose-methods';


// Setup the request logger to run on each request
app.use(logger('dev'));

// Make the static files inside of the `public/` folder publicly accessible
app.use(express.static('public'));

// JSON middleware to parse incoming HTTP requests that contain JSON
app.use(express.json());


//
// Connect to DB
//
mongoose
  .connect(DB_URL)
  .then((response) => {
    console.log(`Connected! Database Name: "${response.connections[0].name}"`);
  })
  .catch((error) => {
    console.log("\n\n Error connecting to DB... \n", error);
  });


// 
// GET /
// 
app.get('/', (req, res, next) => {
  res.send('Hello world');
});


//
// Endpoint to create new pizzas (POST "/pizzas")
//
app.post('/pizzas', (req, res, next) => {

  const newPizza = req.body;

  Pizza.create(newPizza)
    .then((pizzaFromDB) => {
      res.status(201).json(pizzaFromDB);
    })
    .catch((error) => {
      console.log("\n\n Error creating a new pizza in the DB...\n", error);
      res.status(500).json({ error: 'Failed to create a new pizza' });
    });
});


// 
// Endpoint to get a list of pizzas (GET "/pizzas")
// (that's your task 😉)
// 
app.get('/pizzas', (req, res, next) => {

  const { max_price } = req.query;

  Pizza.find()
    .then((pizzas) => {
      if (max_price === undefined){
      res.status(200).json(pizzas);
      return;
      }
      const filteredPizzas = pizzas.filter((pizzaDetails) => {
        return pizzaDetails.price <= parseFloat(max_price);
      });
      res.status(200).json(filteredPizzas);
    })
    .catch((error) => {
      console.log("\n\n Error fetching pizzas in the DB...\n", error);
      res.status(500).json({ error: 'Failed to fetch pizzas' });
    })

})

app.get('/pizzas/:pizzaId', (req, res, next) => {
  let { pizzaId } = req.params;
  Pizza.findById(pizzaId)
    .then((pizza) => {
      res.status(200).json(pizza);
    })
    .catch((error) => {
      console.log("\n\n Error fetching pizza in the DB...\n", error);
      res.status(500).json({ error: 'Failed to fetch pizza' });
    })
})


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
