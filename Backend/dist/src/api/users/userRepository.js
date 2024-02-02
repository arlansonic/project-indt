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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_model_1 = require("../../models/user.model");
class UserRepository {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.User.findAll();
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.User.findByPk(userId);
        });
    }
    createUser(userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.User.create(userDetails);
        });
    }
    updateUser(userId, userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_model_1.User.update(userDetails, { where: { id: userId } });
            return this.getUserById(userId);
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_model_1.User.destroy({ where: { id: userId } });
        });
    }
}
exports.UserRepository = UserRepository;
