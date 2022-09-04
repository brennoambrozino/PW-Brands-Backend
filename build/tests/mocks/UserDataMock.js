"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserData_1 = __importDefault(require("../../src/data/UserData"));
const UserMock_1 = require("./UserMock");
class UserDataMock extends UserData_1.default {
    constructor() {
        super(...arguments);
        this.TABLE_NAME = "table_mock";
        this.insert = (user) => __awaiter(this, void 0, void 0, function* () {
        });
        this.findByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            if (email === "brennoambrozino@gmail.com") {
                return UserMock_1.UserMock;
            }
            else if (email === "brenno@gmail.com") {
                return UserMock_1.UserMock_2;
            }
            else {
                return undefined;
            }
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            if (id === "id_user_1") {
                return UserMock_1.UserMock;
            }
            else if (id === "id_user_2") {
                return UserMock_1.UserMock_2;
            }
            else {
                return undefined;
            }
        });
        this.update = (id, input) => __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = UserDataMock;
//# sourceMappingURL=UserDataMock.js.map