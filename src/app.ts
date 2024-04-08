require('dotenv').config()
import express from 'express'; 
import routes from './routes'; 
import {MessageInterface} from './interface/MessageInterface';
import {mysqlPool, testMySQLConnection} from './db/connect';




const app = express()
app.use(express.urlencoded({extended: true}));
app.use(express.json()) 
testMySQLConnection()

app.get<{}, MessageInterface>('/', (req, res)=>{
    res.json({
        message: 'App Root'
    })
})

app.use('/api/v1', routes)


export default app;