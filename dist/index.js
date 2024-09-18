"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConn_1 = require("./database/dbConn");
const bootstrab_1 = require("./src/bootstrab");
const express_session_1 = __importDefault(require("express-session"));
require("dotenv/config");
const passport_1 = __importDefault(require("passport"));
const app = (0, express_1.default)();
const port = 3000;
(0, dbConn_1.dbConn)();
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static('src/uploads'));
(0, bootstrab_1.bootstrab)(app);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.use((0, express_session_1.default)({
    resave: false,
    saveUninitialized: true,
    secret: 'MohamedElassal',
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.serializeUser(function (user, cb) {
    cb(null, user);
});
passport_1.default.deserializeUser(function (obj, cb) {
    cb(null, obj);
});
