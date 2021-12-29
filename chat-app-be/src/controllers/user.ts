import UserModel from '../models/user';

export default {
  onDeleteUserById: async (req: any, res: any) => { },
  onGetAllUsers: async (req: any, res: any) => {
    try {
      const users = await UserModel.getUsers();

      res
        .status(200)
        .json({
          success: true,
          users,
        })
    } catch (error) {
      return res.status(500).json({ success: false, error })
    }
  },
  onGetCurrentUser: async (req: any, res: any) => {
    try {
      const { userId } = req;

      const errors = []
      if (!userId) {
        errors.push("No logged in user");
      }
      if (errors.length) {
        return res.status(400).json({ "error": errors.join(", ") });
      }

      const user = await UserModel.getUserById(userId);

      res
        .status(200)
        .json({
          success: true,
          user,
        })
    } catch (error) {
      return res.status(500).json({ success: false, error })
    }
  },
  onGetUserById: async (req: any, res: any) => {
    try {
      const { id } = req.params;

      const errors = []
      if (!id) {
        errors.push("No user id specified");
      }
      if (errors.length) {
        return res.status(400).json({ "error": errors.join(", ") });
      }

      const user = await UserModel.getUserById(id);

      res
        .status(200)
        .json({
          success: true,
          user,
        })
    } catch (error) {
      return res.status(500).json({ success: false, error })
    }
  },
  onCreateUser: async (req: any, res: any) => {
    try {
      const { username, email, password } = req.body;

      const errors = []
      if (!password) {
        errors.push("No password specified");
      }
      if (!email) {
        errors.push("No email specified");
      }
      if (!username) {
        errors.push("No user name specified");
      }
      if (errors.length) {
        return res.status(400).json({ "error": errors.join(", ") });
      }

      const user = await UserModel.createUser(username, email, password);

      res
        .status(200)
        .json({
          success: true,
          user,
        })
    } catch (error) {
      return res.status(500).json({ success: false, error })
    }
  },
  onLogin: (req: any, res: any, next: any) => {
    return res
      .status(200)
      .json({
        success: true,
        token: req.authToken,
        user: req.user,
      });
  }
}
