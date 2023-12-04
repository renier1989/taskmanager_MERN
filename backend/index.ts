// esto tiene que estar definido antes que todo para que las variables de entorno puedan funcionar
import dotenv from 'dotenv'
dotenv.config()



import express from 'express';
import conectarDB from './config/db';
import usuarioRoutes from './routes/usuarioRoutes';


const app = express();
app.use(express.json())
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