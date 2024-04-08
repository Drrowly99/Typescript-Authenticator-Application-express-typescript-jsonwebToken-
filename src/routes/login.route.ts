require('dotenv').config()
import express from 'express'; 
import {MessageInterface} from '../interface/MessageInterface';
import {login} from '../controllers/login.controller'


const router = express.Router()
router.post('/', login.login)

export default router;