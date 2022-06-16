import { Request, Response, NextFunction } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import { ZodError } from "zod";
import { ApiError } from "./../utils/error";

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  if(err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message })
  }

  if(err instanceof TokenExpiredError) {
    return res.status(401).json({ message: err.message })
  }

  if(err instanceof ZodError) {
    let errMsg = "";
    err.issues.forEach((issue, idx) => 
      errMsg += issue.message + `${idx < err.issues.length - 1 ? ', ' : '.'}`);
    return res.status(400).json({ message: errMsg.trim() })
  }
  
  return res.status(500).json({message: err.message })
}