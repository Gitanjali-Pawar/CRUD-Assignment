"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const uuid_1 = require("uuid");
const models_1 = require("./models");
dotenv.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const db = new models_1.UsersDatabase();
app.use(express_1.default.json());
// GET all users
app.get('/api/users', (req, res) => {
    const users = db.getAllUsers();
    res.json(users);
});
// GET a specific user by userId
app.get('/api/users/:userId', (req, res) => {
    const userId = req.params.userId;
    const user = db.getUserById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});
// POST create a new user
app.post('/api/users', (req, res) => {
    const { username, age, hobbies } = req.body;
    if (!username || !age) {
        return res.status(400).json({ message: 'Username and age are required' });
    }
    const newUser = {
        id: (0, uuid_1.v4)(),
        username,
        age,
        hobbies: hobbies || [],
    };
    db.addUser(newUser);
    res.status(201).json(newUser);
});
// PUT update existing user
app.put('/api/users/:userId', (req, res) => {
    const userId = req.params.userId;
    const { username, age, hobbies } = req.body;
    const updatedUser = db.updateUser(userId, { username, age, hobbies });
    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
});
// DELETE existing user
app.delete('/api/users/:userId', (req, res) => {
    const userId = req.params.userId;
    const deletedUser = db.deleteUser(userId);
    if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(deletedUser);
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
