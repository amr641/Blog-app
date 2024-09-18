import Joi from "Joi";

const signupVal = Joi.object({
  name: Joi.string().min(5).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[A-Z][a-zA-Z0-9]{8,40}$/)
    .required(),
  bio: Joi.string(),
  preferences: Joi.string(),
  avatar: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .required()
      .valid("image/jpeg", "image/png", "image/jpg"),
    size: Joi.number().required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
  }).required(),
});

const signInVal = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
    
});
const updateProfileVal = Joi.object({
  name: Joi.string().min(5).max(30),
  email: Joi.string().email(),
  bio: Joi.string(),
  preferences: Joi.string(),
  file: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .required()
      .valid("image/jpeg", "image/png", "image/jpg"),
    size: Joi.number().required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
  }),
});

const changePasswordVal = Joi.object({
  oldPassword: Joi.string()
    .pattern(/^[A-Z][a-zA-Z0-9]{8,40}$/)
    .required(),
  newPassword: Joi.string()
    .pattern(/^[A-Z][a-zA-Z0-9]{8,40}$/)
    .required(),
  confirmNewPassword: Joi.valid(Joi.ref("newPassword")).required(),
})

const deleteProfileVal = Joi.object({});
export {
  signupVal,
  signInVal,
  updateProfileVal,
  changePasswordVal,
  deleteProfileVal,
};
