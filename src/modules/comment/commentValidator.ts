import Joi from "Joi";
const addCommentVal = Joi.object({
  postId: Joi.string().hex().length(24).required(),
  content: Joi.string().required(),
});

const editCommentVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
  content: Joi.string(),
});
const deleteCommentVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
export { addCommentVal, editCommentVal, deleteCommentVal };
