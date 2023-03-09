import axios from "axios";
import urls from '../constants/urls';

const BASE_URL = 'http://localhost:5000/api/user';

export const auth = async (name) => {
  try {
    const response = await axios.get(BASE_URL + urls.AUTH + '/' + name);
    localStorage.setItem('name', response.data.name);
    return response;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}