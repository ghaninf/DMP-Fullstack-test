import axios from 'axios';
import { ErrorHandler } from '../libs';

class AuthService {
  async login(email, password) {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/user/login`, {
        email,
        password
      })
      .then(response => {
        if (response.data) {
          this.setToLocalStorage('user', response.data);
        }
        return response.data;
      })
      .catch(error => {
        throw ErrorHandler.httpRequest(error)
      })
  }
  
  logout() {
    this.removeLocalStorage('user')
  }

  setToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  removeLocalStorage(key) {
    localStorage.removeItem(key);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getLoginEmail() {
    return JSON.parse(localStorage.getItem('email'));
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();