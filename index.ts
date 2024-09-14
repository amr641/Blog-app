import express from 'express'
import { dbConn } from './database/dbConn'
import { bootstrab } from './src/bootstrab'
import fs from "fs"
const app = express()
const port = 3000
dbConn()
app.use(express.json())
app.use('/uploads', express.static('src/uploads'));
bootstrab(app)
// if (!fs.existsSync('./uploads')) {
//     fs.mkdirSync('./src/uploads');
//     console.log('File created.');
//   }
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
