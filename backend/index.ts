// const express = require('express');
import express from 'express';
import conectarDB from './config/db';
import dotenv from 'dotenv'
import usuarioRoutes from './routes/usuarioRoutes';


const app = express();
app.use(express.json())
dotenv.config()
conectarDB()
const PORT = process.env.PORT || 4000;



app.use('/api/usuarios', usuarioRoutes);

// app.get('/', (req,res)=>{
//     res.json({'hola': 'renier'})
//     // res.send('hola como estas ?');
// })

app.listen(PORT, ()=>{
    console.log(`servidor en el puerto ${PORT}`);
})