"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersDatabase = void 0;
class UsersDatabase {
    constructor() {
        this.users = [];
    }
    getAllUsers() {
        return this.users;
    }
    getUserById(userId) {
        return this.users.find(user => user.id === userId);
    }
    addUser(newUser) {
        this.users.push(newUser);
    }
    updateUser(userId, updatedUserData) {
        const userIndex = this.users.findIndex(user => user.id === userId);
        if (userIndex === -1)
            return undefined;
        this.users[userIndex] = Object.assign(Object.assign({}, this.users[userIndex]), updatedUserData);
        return this.users[userIndex];
    }
    deleteUser(userId) {
        const userIndex = this.users.findIndex(user => user.id === userId);
        if (userIndex === -1)
            return undefined;
        const deletedUser = this.users.splice(userIndex, 1)[0];
        return deletedUser;
    }
}
exports.UsersDatabase = UsersDatabase;
