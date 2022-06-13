/* eslint-disable */
// updateData
import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  // export const updateData = async (name, email) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';
    // from postman Authentication"Update Current User Password" and Users"Update Current User Data"

    const res = await axios({
      method: 'PATCH',
      url,
      // url: 'http://127.0.0.1:3000/api/v1/users/updateMe', // from postman Users"Update Current User Data"
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
