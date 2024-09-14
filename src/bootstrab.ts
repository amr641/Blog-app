import { Router } from "express"
import { userRouter } from "./modules/user/user.routes"
import { globalHandeling } from "./middleware/errorHandeling/globalHandeling"
import { postRouter } from "./modules/post/post.routes"

export const bootstrab= function(app:Router):void{
app.use('/users',userRouter)
app.use('/posts',postRouter)
app.use(globalHandeling)
}