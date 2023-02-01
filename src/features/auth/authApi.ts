import axios from 'axios';
import { SERVER_URL } from '../../config';

axios.defaults.baseURL = SERVER_URL;

export const signUpApi = async (user: SignUpUser) => {
  try {
    const response = await axios.post('/api/auth/signup', user);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    return error.response;
  }
};

export const signInApi = async (user: SignInValue) => {
  try {
    const response = await axios.post('/api/auth/signin', user);
    return { data: response.data, status: response.status };
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
    const response = await axios.get('/api/auth', headers);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    return error.response;
  }
};
