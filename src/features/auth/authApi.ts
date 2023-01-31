import axios from 'axios';
import { SERVER_URL } from '../../config';

axios.defaults.baseURL = SERVER_URL;

export const signUpApi = async (user: SignUpUser) => {
  try {
    const res = await axios.post('/api/auth/signup', user);
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const signInApi = async (user: SignInValue) => {
  try {
    const res = await axios.post('/api/auth/signin', user);
    return res;
  } catch (error: any) {
    return error.response;
  }
};

interface Token {
  headers: {
    authorization: string;
  };
}

export const getUserByToken = async (headers: Token) => {
  try {
    const res = await axios.get('/api/auth', headers);
    return res;
  } catch (error: any) {
    return error.response;
  }
};
