import express from 'express';
// controllers
import user from '../controllers/user';
// middlewares
import { encode } from '../middlewares/jwt';

const router = express.Router();

router
  .get('/', (req: any, res: any, next: any) => res.json({ "message": "Ok" }))
  .post('/login', encode, user.onLogin);
  // TODO: logout
  // .post('logout', )

export default router;
