import jwt, { JwtPayload } from 'jsonwebtoken';
// models
import UserModel from '../models/user';

const SECRET_KEY = 'some-secret-key';

export const encode = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const user = await UserModel.getUserById(id);

    const payload = {
      userId: user.userid,
    }
    const authToken = jwt.sign(payload, SECRET_KEY);
    console.log('Auth', authToken);
    req.authToken = authToken;
    return next();
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
}

export const decode = (req: any, res: any, next: any) => {
  if (!req.headers['authorization']) {
    return res.status(400).json({ success: false, message: 'No access token provided' });
  }

  const accessToken = req.headers.authorization.split(' ')[1];

  try {
    const payload = (jwt.verify(accessToken, SECRET_KEY) as JwtPayload);
    req.userId = payload.userId;
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error });
  }
}
