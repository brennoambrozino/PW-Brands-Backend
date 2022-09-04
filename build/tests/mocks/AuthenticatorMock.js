"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatorMock = void 0;
class AuthenticatorMock {
    constructor() {
        this.generateToken = (payload) => {
            return "token";
        };
        this.getTokenData = (token) => {
            if (token === "token") {
                return {
                    id: "id_mock"
                };
            }
            else {
                return {
                    id: undefined
                };
            }
        };
    }
}
exports.AuthenticatorMock = AuthenticatorMock;
//# sourceMappingURL=AuthenticatorMock.js.map