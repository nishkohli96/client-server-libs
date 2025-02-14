import { Response } from 'express';
import {
  UserModelCreationAttributes,
  UserModel,
  InactiveUserModel
} from '@/db/mysql/models';
import { sendErrorResponse } from '@/utils';

class UserService {
  async createUser(res: Response, reqBody: UserModelCreationAttributes) {
    try {
      const result = await UserModel.create(reqBody);
      return res.json({
        success: true,
        status: 200,
        message: 'User created.',
        data: result
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Unable to create new user');
    }
  }

  async getActiveUsers(res: Response) {
    try {
      const { count, rows } = await UserModel.findAndCountAll();
      return res.json({
        success: true,
        status: 200,
        message: 'List of active users.',
        data: {
          nbRecords: count,
          records: rows
        }
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Unable to get list of users');
    }
  }

  async getInactiveUsers(res: Response) {
    try {
      const { count, rows } = await InactiveUserModel.findAndCountAll();
      return res.json({
        success: true,
        status: 200,
        message: 'List of inactive users.',
        data: {
          nbRecords: count,
          records: rows
        }
      });
    } catch (error) {
      return sendErrorResponse(
        res,
        error,
        'Unable to get list of inactive users'
      );
    }
  }
}

const userService = new UserService();
export default userService;
