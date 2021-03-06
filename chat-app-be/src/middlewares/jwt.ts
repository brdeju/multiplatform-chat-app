import jwt, { JwtPayload } from 'jsonwebtoken';
// models
import UserModel from '../models/user';

const SECRET_KEY = 'some-secret-key';

export const encode = async (req: any, res: any, next: any) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.logIn(email, password);

    const payload = {
      userId: user.userid,
      user,
    }
    const authToken = jwt.sign(payload, SECRET_KEY);
    req.authToken = authToken;
    req.user = user;

    return next();
  } catch (error) {
    return res.status(400).json({ success: false, message: 'No user with given email and/or password exists' });
  }
}

export const decode = (req: any, res: any, next: any) => {
  if (!req.headers['authorization']) {
    return res.status(400).json({ success: false, message: 'No access token provided' });
  }

  const [authType, accessToken] = req.headers.authorization.trim().split(' ');

  if (authType !== 'Bearer') {
    return res.status(400).json({ success: false, message: 'Expected a Bearer token' });
  }

  try {
    const payload = (jwt.verify(accessToken, SECRET_KEY) as JwtPayload);
    req.userId = payload.userId;
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error });
  }
}
