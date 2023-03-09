import {getAll, sent, read} from '../service/LetterService.js';

export const getAllUserLetter = async (req, res, next) => {
  try {
    const users = await getAll(req.params.name);
    return res.json(users);
  }
  catch (err) {
    next(err);
  }
}

export const sentMassage = async (req, res, next) => {
  try {
    const users = await sent(req.body);
    return res.json(users);
  }
  catch (err) {
    next(err);
  }
}

export const readMassage = async (req, res, next) => {
  try {
    const users = await read(req.params.id);
    return res.json(users);
  }
  catch (err) {
    next(err);
  }
}