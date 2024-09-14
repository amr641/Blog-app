"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConn = void 0;
const mongoose_1 = require("mongoose");
const dbConn = () => {
    (0, mongoose_1.connect)('mongodb://localhost:27017/blog')
        .then(() => {
        console.log('DB connected');
    }).catch(() => {
        console.log('Err DB Connection');
    });
};
exports.dbConn = dbConn;
