"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMock_2 = exports.UserMock = void 0;
const User_1 = __importDefault(require("../../src/model/User"));
exports.UserMock = new User_1.default("id_user_1", "brennoambrozino@gmail.com", "brenno", "ambrozino", "5521995116053", "avatar", "brennoambrozino");
exports.UserMock_2 = new User_1.default("id_user_2", "brenno@gmail.com", "brenno", "ambrozino", "5521995116053", "avatar", "brennolegal");
//# sourceMappingURL=UserMock.js.map