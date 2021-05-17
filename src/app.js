const routes = require('./routes/routes');

const express = require('express');
const app = express();


// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

//Routes
app.use(routes)

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
  });
  


