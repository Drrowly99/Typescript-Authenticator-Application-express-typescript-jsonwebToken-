import {mysqlPool as pgpool} from '../db/connect';
import { v4 as uuidv4 } from 'uuid';

// Define the User interface (assuming you have a User model)
interface User {
    id: string;
    email: string;
    password:string;
    // ... other user properties
  }
  
  // Interface for the callback function
  interface UserCallback {
    (err: Error | null, user: Partial<User> | null): void;
  }


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
