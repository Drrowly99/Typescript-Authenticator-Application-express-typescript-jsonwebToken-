require('dotenv').config()
import log from "./logger"; 
import config from 'config';
import app from './app';



// const port = process.env.PORT || 3000
const host = config.get("port") as string
const port = config.get("port") as number 
app.listen(port, host, () => {
    log.info(`App started at http://localhost${port}`)
})
