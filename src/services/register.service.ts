import {mysqlPool as pgpool} from '../db/connect';
import { v4 as uuidv4 } from 'uuid';
import {IncomingData, UserCallback} from '../interface/AuthInterface'

 export const registerService = {

    register: (data: Partial<IncomingData>, callback:UserCallback ) =>{
        pgpool.query(
            `insert into users(firstName, lastName, email, password, number, user_id) values(?,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.password,
                data.number,
                uuidv4()
            ],
            (err, res, fields) =>{
                if(err){
                    return callback(err, null);
                }
                return callback(null, res.rows)
            },
        )
    },

}
