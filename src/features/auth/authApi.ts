import axios from 'axios';
import { SERVER_URL } from '../../config';

axios.defaults.baseURL = SERVER_URL;

export const signUpApi = async (user: SignUpUser) => {
  try {
    const newUser = {
      profile_id: user.profileId,
      name: user.name,
      password: user.password,
    };
    const response = await axios.post('/api/auth/signup', newUser);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    return error.response;
  }
};

export const signInApi = async (user: SignInValue) => {
  try {
    const signInUser = {
      profile_id: user.profileId,
      password: user.password,
    };
    const response = await axios.post('/api/auth/signin', signInUser);
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
