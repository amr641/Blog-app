import joi from "joi";
const addPostVal = joi.object({
  title: joi.string().required(),
  category: joi.string().required(),
  tags: joi.array().items(joi.string()),
  finished: joi.boolean(),
  scheduled: joi.boolean(),
  publishDate: joi.date(),
  file: joi
    .object({
      fieldname: joi.string().required(),
      originalname: joi.string().required(),
      encoding: joi.string().required(),
      mimetype: joi
        .string()
        .required()
        .valid("image/jpeg", "image/png", "image/jpg"),
      size: joi.number().required(),
      destination: joi.string().required(),
      filename: joi.string().required(),
      path: joi.string().required(),
    })
    .required(),
});


const getAllPostsVal=joi.object({})
const getUnFinisedPostsVal=joi.object({})
const editPostVal=joi.object({
    id:joi.string().hex().length(24).required(),
    title: joi.string(),
    category: joi.string(),
    tags: joi.array().items(joi.string()),
    finished: joi.boolean(),
    scheduled: joi.boolean(),
    publishDate: joi.date(),
    file: joi
      .object({
        fieldname: joi.string(),
        originalname: joi.string(),
        encoding: joi.string(),
        mimetype: joi
          .string()
          .required()
          .valid("image/jpeg", "image/png", "image/jpg"),
        size: joi.number().required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
      })
})

const deletePostVal=joi.object({
    id:joi.string().hex().length(24).required()
})
export { addPostVal ,getAllPostsVal,getUnFinisedPostsVal,editPostVal,deletePostVal};
