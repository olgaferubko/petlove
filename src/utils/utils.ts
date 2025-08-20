import axios from 'axios';

axios.defaults.baseURL = 'https://petlove.b.goit.study/api';

export const setAuthorizationHeader = (token?: string | null) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization; 
  }
};

export const clearAuthorizationHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};