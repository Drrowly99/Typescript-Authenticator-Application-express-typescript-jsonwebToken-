import {mysqlPool as pgpool} from '../db/connect';
import { v4 as uuidv4 } from 'uuid';
import {IncomingData, User, UserCallback} from '../interface/AuthInterface'



 export const loginService = {
    getUserByUserEmail: (email: string, callback:UserCallback ) =>{
        pgpool.query(
            `select * from users where email = ?`,
            [
                email
            ],
            (err, res, fields) =>{
                if(err){
                    // console.log('an error occured')
                    return callback(err, null);
                }
                console.log(res[0].id)
                return callback(null, res[0])
            }

        )
    },
    getUser: (password:string, email: string, callback:UserCallback ) =>{
        pgpool.query(
            `select * from users where email = ?`,
            [
                email
            ],
            (err, res, fields) =>{
                if(err){
                    return callback(err, null);
                }
                return callback(null, res)
            }

        )
    },

}
