import express from 'express';
// controllers
import user from '../controllers/user';
import { decode } from '../middlewares/jwt';
import multer from '../middlewares/multer';

const router = express.Router();

router
  .get('/', decode, user.onGetCurrentUser)
  .get('/all', user.onGetAllUsers)
  .post('/', multer.single('avatar'), user.onCreateUser)
  .get('/:id', user.onGetUserById)
  .delete('/:id', user.onDeleteUserById)

export default router;
