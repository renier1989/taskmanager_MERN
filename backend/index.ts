// esto tiene que estar definido antes que todo para que las variables de entorno puedan funcionar
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import conectarDB from "./config/db";
import usuarioRoutes from "./routes/usuarioRoutes";
import proyectoRoutes from "./routes/proyectoRoutes";
import tareaRoutes from "./routes/tareaRoutes";
import cors, { CorsOptionsDelegate } from "cors";

const app = express();
app.use(express.json());
conectarDB();

const whitelist = [process.env.FRONTEND_URL];

const corsOptions: any = {
  origin: function (origin: string, callback: Function) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error con el cors"));
    }
  },
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 4000;

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareaRoutes);

// app.get('/', (req,res)=>{
//     res.json({'hola': 'renier'})
//     // res.send('hola como estas ?');
// })

const servidor = app.listen(PORT, () => {
  console.log(`servidor en el puerto ${PORT}`);
});

// SOCKET.IO
import { Server } from "socket.io";
const io = new Server(servidor, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL
    }
});

io.on('connection', (socket)=>{
    console.log(socket);
    // aqui es donde se definen los eventos de socket.io

    
})
