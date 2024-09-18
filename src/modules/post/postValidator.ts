import Joi from "Joi";
const addPostVal = Joi.object({
  user:Joi.string().hex().length(24),
  title: Joi.string().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  finished: Joi.boolean(),
  scheduled: Joi.boolean(),
  publishDate: Joi.date(),
  content: Joi.alternatives().try(
  Joi
    .object({
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      encoding: Joi.string().required(),
      mimetype: Joi
        .string()
        .required()
        .valid("image/jpeg", "image/png", "image/jpg","video/mp4"),
      size: Joi.number().required(),
      destination: Joi.string().required(),
      filename: Joi.string().required(),
      path: Joi.string().required(),
    }),
    Joi.string().min(5)
    )
    .required(),
});


const getAllPostsVal=Joi.object({
  search:Joi.string()
})
const getUnFinisedPostsVal=Joi.object({})
const editPostVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
    title: Joi.string(),
    category: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    finished: Joi.boolean(),
    scheduled: Joi.boolean(),
    publishDate: Joi.date(),
    content: Joi
      .object({
        fieldname: Joi.string(),
        originalname: Joi.string(),
        encoding: Joi.string(),
        mimetype: Joi
          .string()
          .required()
          .valid("image/jpeg", "image/png", "image/jpg","video/mp4"),
        size: Joi.number().required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
      })
})

const deletePostVal=Joi.object({
    id:Joi.string().hex().length(24).required()
})
export { addPostVal ,getAllPostsVal,getUnFinisedPostsVal,editPostVal,deletePostVal};