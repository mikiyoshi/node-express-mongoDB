/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async (name, email, password, passwordConfirm) => {
  console.log('signup.js', name, email, password, passwordConfirm);
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Create Account in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
    console.log(res);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
