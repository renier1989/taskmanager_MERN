import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import Usuario from "../models/Usuario";

interface ExpressReqRes {
    (req: Request | any, res: Response,next:NextFunction): void;
  }

const checkAuth:ExpressReqRes = async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        try {
        const envJWT = process.env.JWT_SECRET;
        token = req.headers.authorization.split(" ")[1];
        const tokenDecoded:any = jwt.verify(token, (envJWT as string));
        req.usuario = await Usuario.findById(tokenDecoded.id).select("-password -__v -createdAt -updatedAt -token -confirmado")
        next();
        } catch (error) {   
            return res.status(404).json({ msg: `Hubo un error.!!!`, error});
        }   
    }

    if(!token){
        const error = new Error(`Token no valido.!!!`);
        res.status(401).json({ msg: error.message });
    }
    


}

export default checkAuth
