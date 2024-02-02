import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.headers.authorization?.split(' ')[1]        
        if(!token) throw new Error('No token provided')

        const decoded = jwt.verify(token, 'token')
        req.body.userId = decoded
        next();
    }catch(error){
        return res.status(401).json({message: "Token is not valid"})
    }
}