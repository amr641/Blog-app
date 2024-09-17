import express from 'express'
import { dbConn } from './database/dbConn'
import { bootstrab } from './src/bootstrab'
import fs from "fs"
import 'dotenv/config'
const app = express()
const port = 3000
dbConn()
app.use(express.json())
app.use('/uploads', express.static('src/uploads'));
bootstrab(app)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
