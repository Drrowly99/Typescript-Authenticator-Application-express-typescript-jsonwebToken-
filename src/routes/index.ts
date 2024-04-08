require('dotenv').config()
import express from 'express'; 
import login from './login.route'; 
import register from './register.route'; 
import {MessageInterface} from '../interface/MessageInterface';

const router = express.Router()


router.get<{}, MessageInterface>('/', (req, res)=>{
    res.json({
        message: 'Root of APi'
    })
})


router.use('/login', login)
router.use('/register', register)

export default router;