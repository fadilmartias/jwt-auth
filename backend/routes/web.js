import express from "express";
import { index, store, show, update, destroy } from "../controllers/UserController.js";
import { Register, Login, Logout, refreshToken } from "../controllers/AuthController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

// user
router.get('/users', verifyToken, index);
router.post('/users', verifyToken, store);
router.put('/users/:id', verifyToken, update);
router.get('/users/:id', verifyToken, show);
router.delete('/users/:id', verifyToken, destroy);


// auth
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

export default router;

