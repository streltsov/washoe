import { User } from './users.model';
import { getModelForClass } from '@typegoose/typegoose';

export const UserModel = getModelForClass(User);
