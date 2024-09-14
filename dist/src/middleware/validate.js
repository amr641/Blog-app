"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = require("../utils/appError");
const validate = (schema) => {
    return (req, res, next) => {
        let files = () => { return { [`${req.file?.fieldname}`]: req.file }; };
        const { error } = schema.validate({
            ...req.body,
            ...req.params,
            ...req.query,
            ...files(),
        }, { abortEarly: false });
        if (!error)
            return next();
        const errors = error?.details.map((ele) => ele.message);
        next(new appError_1.AppError(errors, 403));
    };
};
exports.default = validate;
