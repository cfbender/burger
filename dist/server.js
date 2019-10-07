"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var expressHbs = require("express-handlebars");
var path_1 = __importDefault(require("path"));
var controllers_1 = __importDefault(require("./controllers"));
var app = express_1.default();
var PORT = process.env.PORT || 5000;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.use("/dist", express_1.default.static("dist"));
app.engine("handlebars", expressHbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path_1.default.join(__dirname, "..", "src", "views"));
app.use(controllers_1.default);
app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});
