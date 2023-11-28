// traemos a express
const express = require("express");
const cors = require('cors');
const routerApi = require ('./routers/index');
const { logErrors, errorHandler, boomErrorHandler  } = require('./middlewares/erro.handler')

// creamos una aplicación
const app = express();

//le decimos el puerto en que queremos que corra la aplicación
const port = 3000;

//aplicar un midleware nativo de express.
app.use(express.json())

const whitelist = ['htpp://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));
//definimos la ruta
// tiene un callback que va a ejecutar la respuesta que enviemos al cliente.
//el callback siempre tiene dos parámetros "req" y "res".
app.get ("/nueva-ruta", (req, res) => {
  res.send("soy una nuevga ruta");
});

routerApi(app)

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);



//le decimos a la aplicación en que puesto escuchar
// además creamos un callback que nos avisará cuando esté corriendo
app.listen(port, () => {
  console.log("mi port" + port);
});
