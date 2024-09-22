import { Router } from "express"
import { userRouter } from "./modules/user/user.routes"
import { globalHandeling } from "./middleware/errorHandeling/globalHandeling"
import { postRouter } from "./modules/post/post.routes"
import { commentRouter } from "./modules/comment/comments.routes"
import { replyRouter } from "./modules/replie/reply.routes"
import { facebookRouter } from "./modules/user/facebook.routes"
import { checkScheduledPosts } from "./middleware/checkScheduled"

export const bootstrab= function(app:Router):void{
app.use('/users',userRouter)
app.use('/posts',postRouter)
app.use('/comments',commentRouter)
app.use('/replies',replyRouter)
app.use(checkScheduledPosts,facebookRouter)

app.use(globalHandeling)
}