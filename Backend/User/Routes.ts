import { Router } from 'express';
import { getUsers, getUserById, addUser, updateUser, deleteUser } from './Controller';

const router = Router();

// route: /api/users
router.route('/')
    .get(getUsers)       // GET all users
    .post(addUser);      // POST new user

// route: /api/users/:id
router.route('/:id')
    .get(getUserById)    // GET user by ID
    .patch(updateUser)   // PATCH update user
    .delete(deleteUser); // DELETE user
    
export default router;
