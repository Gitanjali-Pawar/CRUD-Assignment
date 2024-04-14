export interface User {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}

export class UsersDatabase {
    private users: User[];

    constructor() {
        this.users = [];
    }

    getAllUsers(): User[] {
        return this.users;
    }

    getUserById(userId: string): User | undefined {
        return this.users.find(user => user.id === userId);
    }

    addUser(newUser: User): void {
        this.users.push(newUser);
    }

    updateUser(userId: string, updatedUserData: Partial<User>): User | undefined {
        const userIndex = this.users.findIndex(user => user.id === userId);
        if (userIndex === -1) return undefined;
        this.users[userIndex] = { ...this.users[userIndex], ...updatedUserData };
        return this.users[userIndex];
    }

    deleteUser(userId: string): User | undefined {
        const userIndex = this.users.findIndex(user => user.id === userId);
        if (userIndex === -1) return undefined;
        const deletedUser = this.users.splice(userIndex, 1)[0];
        return deletedUser;
    }
}
