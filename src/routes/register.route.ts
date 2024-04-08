require('dotenv').config()
import express from 'express'; 
import {MessageInterface} from '../interface/MessageInterface';
import {register} from '../controllers/register.controller'


const router = express.Router()
router.post('/', register.register)

export default router;