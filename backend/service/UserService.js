import User from '../models/UserModel.js';

export const getOrSet = async (name) => {
  let user = await User.findOne({
    where: {
      name: name,
    }
  });
  if (!user) {
    user = await User.create({ name:name });
  }
  return user;
}