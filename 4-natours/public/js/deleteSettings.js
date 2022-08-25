/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const deleteSettings = async (res, req) => {
  console.log('deleteSettings.js', res, req, req.params.slug);
  try {
    // const res = await axios({
    //   method: 'DELETE',
    //   url: '/api/v1/reviews/:id',
    //   data: {
    //     email,
    //     password
    //   }
    // });

    // if (res.data.status === 'success') {
    //   showAlert('success', 'Logged in successfully!');
    //   window.setTimeout(() => {
    //     location.assign('/');
    //   }, 1500);
    // }
    console.log(res);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
