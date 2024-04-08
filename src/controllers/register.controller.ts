import {genSaltSync, hashSync, compareSync, compare}  from 'bcrypt'
import {Request, Response, NextFunction} from 'express'
import {registerService as reg_ser} from '../services/register.service'
import {IncomingData, User, UserCallback} from '../interface/AuthInterface'


import jwt from 'jsonwebtoken'
import crypto from 'crypto'


export const login = {

    register: async (req:Request, res:Response) => {
        const body: Partial<IncomingData> = req.body
        const password = body.password as string
        const salt = genSaltSync(10);
        body.password = hashSync(password, salt)
        reg_ser.register(body , (err, results)=>{
            if(err){
                console.log(err);
                return res.status(400).json({
                    error: 1,
                    message : err,
                })
            }
            return res.status(200).json({
                success:1,
                data : results,
            })
        })
    }
}
