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
exports.UserController = void 0;
const user_find_1 = require("./usecases/user.find");
const validation_email_1 = require("../../utils/validation-email");
const user_model_1 = require("../../models/user.model");
class UserController {
    constructor() {
        this.getAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userService.getAllUsers();
            return res.status(200).json(users);
        });
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.params.id);
            const user = yield this.userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(user);
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password, accessLevel } = req.body;
            if (!firstName || !lastName || !email || !password || !accessLevel) {
                return res.status(400).json({ message: "Missing required information" });
            }
            if (!(0, validation_email_1.validarEmail)(email))
                return res.status(400).json({ message: "Invalid email" });
            const emailExists = yield user_model_1.User.findOne({ where: { email } });
            if (emailExists)
                return res.status(400).json({ message: "Email already exists" });
            const userDetails = req.body;
            const user = yield this.userService.createUser(userDetails);
            return res.status(201).json(user);
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.params.id);
            const userDetails = req.body;
            const user = yield this.userService.updateUser(userId, userDetails);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(user);
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.params.id);
            yield this.userService.deleteUser(userId);
            return res.status(204).json();
        });
        this.userService = new user_find_1.UserService();
    }
}
exports.UserController = UserController;
