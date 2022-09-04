"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserBusiness_1 = __importDefault(require("./business/UserBusiness"));
const app_1 = require("./controller/app");
const UserController_1 = __importDefault(require("./controller/UserController"));
const UserData_1 = __importDefault(require("./data/UserData"));
const Errors_1 = require("./errors/Errors");
const Authenticator_1 = require("./services/Authenticator");
const HashManager_1 = require("./services/HashManager");
const IdGenerator_1 = require("./services/IdGenerator");
const userBusiness = new UserBusiness_1.default(new UserData_1.default(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager(), new Authenticator_1.Authenticator(), new Errors_1.Errors());
const userController = new UserController_1.default(userBusiness, new Errors_1.Errors());
app_1.app.get("/usuario", userController.getAll);
app_1.app.get("/usuario/:id", userController.getById);
app_1.app.post("/usuario", userController.signup);
app_1.app.put("/usuario/:id", userController.update);
app_1.app.delete("/usuario/:id", userController.delete);
//# sourceMappingURL=index.js.map