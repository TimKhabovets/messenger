import { getOrSet } from '../service/UserService.js';

export const auth = async (req, res, next) => {
  try {
    const users = await getOrSet(req.params.name);
    return res.json(users);
  }
  catch (err) {
    next(err);
  }
}