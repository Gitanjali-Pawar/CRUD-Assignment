import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { User, UsersDatabase } from './models';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;
const db = new UsersDatabase();

app.use(express.json());

// GET all users
app.get('/api/users', (req: Request, res: Response) => {
    const users = db.getAllUsers();
    res.json(users);
});

// GET a specific user by userId
app.get('/api/users/:userId', (req: Request, res: Response) => {
    const userId = req.params.userId;
    const user = db.getUserById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

// POST create a new user
app.post('/api/users', (req: Request, res: Response) => {
    const { username, age, hobbies } = req.body;
    if (!username || !age) {
        return res.status(400).json({ message: 'Username and age are required' });
    }
    const newUser: User = {
        id: uuidv4(),
        username,
        age,
        hobbies: hobbies || [],
    };
    db.addUser(newUser);
    res.status(201).json(newUser);
});

// PUT update existing user
app.put('/api/users/:userId', (req: Request, res: Response) => {
    const userId = req.params.userId;
    const { username, age, hobbies } = req.body;
    const updatedUser = db.updateUser(userId, { username, age, hobbies });
    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
});

// DELETE existing user
app.delete('/api/users/:userId', (req: Request, res: Response) => {
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
