import {genSaltSync, hashSync, compareSync, compare}  from 'bcrypt'
import {Request, Response, NextFunction} from 'express'
import {loginService as log_ser} from '../services/login.service'


import jwt from 'jsonwebtoken'
import crypto from 'crypto'



export const login = {

    login: async (req:Request, res:Response): Promise<void> => {
        try{

            console.log(process.env.REFRESH_TOK_SEC)
            
            const byteLength = 8; // 8 characters = 16 bytes
            const uniqueID = crypto.randomBytes(byteLength).toString('hex');
    

            const salt = genSaltSync(10);
            let password = hashSync(req.body.Password, salt)
            // check if email exists first
            log_ser.getUserByUserEmail(req.body.Email, async (err, results) =>{
                if(err){
                    return
                }
                        
                if(results){
                    let result = compareSync(req.body.Password, results.password as string)
                    if(result){
                        results.password = undefined
                        console.log(results)
                        const accessToken = jwt.sign({result : results, jti: uniqueID}, process.env.REFRESH_TOK_SEC as string, {
                            expiresIn: "1h"
                        })

                        return res.status(200).json({
                            success:1,
                            message : 'user loggedin successfully',
                            token : accessToken,
                        })
                    }else{
                        return res.status(302).json({
                            error:1,
                            message : 'Email or password does not exist',
                        })
                    }
                }

            
            }) 

        } catch(err){
            console.log(err)
        }
    }
}
