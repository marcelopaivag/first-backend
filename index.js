require('dotenv').config()
const express = require('express')
const { default: mongoose } = require('mongoose')
routes = require('./src/routes/index')
const cors = require('cors')
const app = express()

const corsOptions = {
    origin: '*', // Reemplaza esto con el dominio permitido
    methods: 'GET,PUT,POST,DELETE',
    credentials: true, // Permite el envío de cookies o credenciales
    optionsSuccessStatus: 204, // Configura el código de respuesta para las solicitudes OPTIONS
};

app.use(cors(corsOptions))
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
app.use('/v1', routes)

app.listen(process.env.PORT, () => {
    console.log('Servidor iniciado en el puerto' + process.env.PORT)
})