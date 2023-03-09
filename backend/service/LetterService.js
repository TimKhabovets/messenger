import Letter from '../models/LetterModel.js';
import User from '../models/UserModel.js';
import { Sequelize } from 'sequelize';

export const getAll = async (name) => {
  let letters = await Letter.findAll({
    where: {
      recipient: name,
    }, 
    order: [ ['id', 'DESC']],
  });
  for (let letter = 0; letter < letters.length; letter++) {
    let author = await User.findOne({
      where: {
        id: letters[letter].dataValues.author
      }
    })
    letters[letter].dataValues.author = author.dataValues.name;
  }
  return letters;
}

export const sent = async (letter) => {
  const author = await User.findOne({
    where: {
      name: letter.author
    }
  });
  const user = await Letter.create({
    text: letter.text,
    topic: letter.topic,
    recipient: letter.recipient,
    author: author.id,
    date: Sequelize.fn('NOW')
  });
  return user;
}

export const read = async (id) => {
  let letterData = await Letter.update( {
    status: true
  }, {
    where: {
      id: id,
    }
  });
  return letterData;
}

