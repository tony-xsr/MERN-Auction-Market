import { FilterQuery, QueryOptions } from 'mongoose';
import UserModel from '../models/user.model';
// find User 
export const findUserBy = async (
    query: FilterQuery<{}>,
    options: QueryOptions = {}
  ) => {
    return await UserModel.findOne(query, {}, options);
  };
  