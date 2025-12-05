import express from 'express';
const router = express.Router();
import { signup, login, logout, checkAuth, getAllUsers, updateUser, deleteUser, toggleRole, addUser } from "../controllers/userController.js";
import { authUser } from '../middlewares/authUser.js';

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.get('/check', authUser, checkAuth);
router.get('/getusers', authUser, getAllUsers);
router.put('/update/:id', authUser, updateUser);
router.post('/delete/:id', authUser, deleteUser);
router.put('/toggle-role/:id', authUser, toggleRole);
router.post('/add-user', authUser, addUser);

export default router;