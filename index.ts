import express from 'express'
import { dbConn } from './database/dbConn'
import { bootstrab } from './src/bootstrab'
import session from 'express-session'
import 'dotenv/config'
import passport from 'passport'
const app = express()
const port = 3000
dbConn()
app.use(express.json())
app.use('/uploads', express.static('src/uploads'));
bootstrab(app)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: 'MohamedElassal',
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
  passport.deserializeUser(function (obj:object, cb) {
    cb(null, obj);
  });
  