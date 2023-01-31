import axios from 'axios';
import { SERVER_URL } from '../config';

axios.defaults.baseURL = SERVER_URL;

export const signUpApi = async (user: SignUpUser) => {
  try {
    const res = await axios.post('/api/auth/signup', user);
    return res;
  } catch (error: any) {
    return error.response;
  }
};
