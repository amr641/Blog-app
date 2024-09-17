import { connect } from "mongoose";

export const dbConn=  ( ):void => {
    connect(process.env.DB_URI as string)
    .then(()=>{
    console.log('DB connected');
}).catch(()=>{
    console.log('Err DB Connection');
})
}