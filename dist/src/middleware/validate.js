"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = require("../utils/appError");
const validate = (schema) => {
    return (req, res, next) => {
        let files = () => { var _a; return { [`${(_a = req.file) === null || _a === void 0 ? void 0 : _a.fieldname}`]: req.file }; };
        const { error } = schema.validate(Object.assign(Object.assign(Object.assign(Object.assign({}, req.body), req.params), req.query), files()), { abortEarly: false });
        if (!error)
            return next();
        const errors = error === null || error === void 0 ? void 0 : error.details.map((ele) => ele.message);
        next(new appError_1.AppError(errors, 403));
    };
};
exports.default = validate;
