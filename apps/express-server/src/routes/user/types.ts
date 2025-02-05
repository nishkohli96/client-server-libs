import { Request } from 'express';
import { UserModelCreationAttributes } from '@/db/mysql/models';

export type AddUserRequest = Request<object, object, UserModelCreationAttributes>;
