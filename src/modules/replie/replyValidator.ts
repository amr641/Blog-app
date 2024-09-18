import Joi from "Joi"
const replytoCommentVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
    content:Joi.string().required()
})

const editReplyVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
    content:Joi.string()
})
const deleteReplyVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
})
export {replytoCommentVal,editReplyVal,deleteReplyVal}