import { Request, Response } from "express";
import Tarea from "../models/Tarea";
import Proyecto from "../models/Proyecto";
import mongoose from "mongoose";
import { isValidId } from "../helpers/validId";
import { ITarea } from '../models/Tarea';

interface ExpressReqRes {
  (req: Request | any, res: Response): void;
}

const agregarTarea: ExpressReqRes = async (req, res) => {
  const { proyecto } = req.body;
  const ExisteProyecto = await Proyecto.findById(proyecto);

  if (!ExisteProyecto) {
    const error = new Error(`El proyecto no Existe.!!!`);
    return res.status(404).json({ msg: error.message });
  }

  // compruebo si la persona autenticada es el creador del proyecto para permitirle agregar tareas a ese proyecto
  if (ExisteProyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error(`No puedes agregar tareas a este Proyecto.!!!`);
    return res.status(401).json({ msg: error.message });
  }

  try {
    const tareaNueva = await Tarea.create(req.body);
    res.status(200).json(tareaNueva);
  } catch (error) {
    console.log(error);
  }
};
const obtenerTarea: ExpressReqRes = async (req, res) => {
  const { id } = req.params;
  try {
    // esto es para que no salte un error si el id no es valido
    if (!isValidId(id)) {
      const error = new Error(`No pudimos encontrar la tarea.!!!`);
      return res.status(404).json({ msg: error.message });
    }

    const tarea = await Tarea.findById(id).populate("proyecto");

    // verifico si puedo ver las tareas de un proyecto que no he creado
    if (tarea?.proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error(
        `No puedes vizualizar las tareas a este Proyecto.!!!`
      );
      return res.status(401).json({ msg: error.message });
    }

    res.status(200).json(tarea);
  } catch (error) {
    console.log(error);
  }
};
const actualizarTarea: ExpressReqRes = async (req, res) => {
  const { id } = req.params;
  try {
    // esto es para que no salte un error si el id no es valido
    if (!isValidId(id)) {
      const error = new Error(`No pudimos encontrar la tarea.!!!`);
      return res.status(404).json({ msg: error.message });
    }
    
    const tarea:any = await Tarea.findById(id).populate("proyecto");

    // verifico si puedo ver las tareas de un proyecto que no he creado
    if (tarea?.proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error(
        `No puedes editar esta Tarea.!!!`
      );
      return res.status(401).json({ msg: error.message });
    }

    tarea.nombre  = req.body.nombre || tarea.nombre;
    tarea.descripcion  = req.body.descripcion || tarea.descripcion;
    tarea.fechaEntrega  = req.body.fechaEntrega || tarea.fechaEntrega;
    tarea.prioridad  = req.body.prioridad || tarea.prioridad;

    const tareaActualizada = await tarea.save();
    res.status(200).json(tareaActualizada);
  } catch (error) {
    console.log(error);
  }
};
const eliminarTarea: ExpressReqRes = async (req, res) => {
    const { id } = req.params;
    try {
      // esto es para que no salte un error si el id no es valido
      if (!isValidId(id)) {
        const error = new Error(`No pudimos encontrar la tarea.!!!`);
        return res.status(404).json({ msg: error.message });
      }
      
      const tarea = await Tarea.findById(id).populate("proyecto");
  
      // verifico si puedo ver las tareas de un proyecto que no he creado
      if (tarea?.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error(
          `No puedes eliminar esta Tarea.!!!`
        );
        return res.status(401).json({ msg: error.message });
      }
  
      await tarea?.deleteOne()      
      res.status(200).json({msg:`Tarea eliminada con exito.!!!`});
    } catch (error) {
      console.log(error);
    }
};
const cambiarEstadoTarea: ExpressReqRes = async (req, res) => {};

export {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstadoTarea,
};
