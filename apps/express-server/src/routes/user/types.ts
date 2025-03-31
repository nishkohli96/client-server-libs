import { type Request } from 'express';
import { type UserModelCreationAttributes } from '@/db/mysql/models';

export type AddUserRequest = Request<object, object, UserModelCreationAttributes>;
