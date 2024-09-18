import joi from 'joi'
const replytoCommentVal=joi.object({
    id:joi.string().hex().length(24).required(),
    content:joi.string().required()
})

const editReplyVal=joi.object({
    id:joi.string().hex().length(24).required(),
    content:joi.string()
})
const deleteReplyVal=joi.object({
    id:joi.string().hex().length(24).required(),
})
export {replytoCommentVal,editReplyVal,deleteReplyVal}