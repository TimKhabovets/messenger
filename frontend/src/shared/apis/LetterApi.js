import axios from "axios";
import urls from '../constants/urls';

const BASE_URL = 'http://localhost:5000/api/letter';

export const getLetters = async (name) => {
  try {
    const response = await axios.get(BASE_URL + urls.GETALL + '/' + name);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const sentLetter = async (data) => {
  try {
    const response = await axios.post(BASE_URL + urls.SENT, data);
    return response;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const readLetter = async (id) => {
  try {
    const response = await axios.get(BASE_URL + urls.READ + '/' + id);
    return response;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}