import { NextFunction, Request, Response } from "express";

interface ExpressReqRes {
    (req: Request, res: Response,next:NextFunction): void;
  }

const checkAuth:ExpressReqRes = (req,res,next)=>{

    console.log('desde el checkAuth middleware');

    next();

    
}

export default checkAuth
