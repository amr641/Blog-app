import { Router } from "express"
import { userRouter } from "./modules/user/user.routes"
import { globalHandeling } from "./middleware/errorHandeling/globalHandeling"
import { postRouter } from "./modules/post/post.routes"
import { commentRouter } from "./modules/comment/comments.routes"

export const bootstrab= function(app:Router):void{
app.use('/users',userRouter)
app.use('/posts',postRouter)
app.use('/comments',commentRouter)

app.use(globalHandeling)
}