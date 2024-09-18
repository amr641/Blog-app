import passport from 'passport'
import { User } from '../../../database/models/userModel';
import facebook from 'passport-facebook'
import { NextFunction, Request, Response, Router } from 'express';
const FacebookStrategy=facebook.Strategy
const facebookRouter =Router()
import 'dotenv/config'
import { AppError } from '../../utils/appError';
import { catchError } from '../../middleware/errorHandeling/catchErrors';
passport.use(
  new FacebookStrategy(
    {
      clientID:'894388332019012',
      clientSecret: 'f3ec0038f9c5e5bff630f117bcf799c5',
      callbackURL: 'http://localhost:3000/',
    },
    async function ( profile:any, cb:any) {
      const user = await User.findOne({
        accountId: profile.id,
        provider: 'facebook',
      });
      if (!user) {
        console.log('Adding new facebook user to DB..');
        const user = new User({
          accountId: profile.id,
          name: profile.displayName,
          provider: profile.provider,
        });
        await user.save();
        // console.log(user);
        return cb(null, profile);
      } else {
        console.log('Facebook User already exist in DB..');
        // console.log(profile);
        return cb(null, profile);
      }
    }
  )
);
facebookRouter.get('/facebook',catchError((req:any,res:any,next:NextFunction)=>{
    passport.authenticate('facebook', (err:any,user:any)=>{
        const userInfo = {
            id: req.session.passport.user.id,
            displayName: req.session.passport.user.displayName,
            provider: req.session.passport.user.provider,
          };
       if(err)return next(new AppError('login failed ',401))
    res.json({message:userInfo})
    } )


}));
export  default facebookRouter