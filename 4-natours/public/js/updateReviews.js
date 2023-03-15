/* eslint-disable */
// updateData
import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const updateReviews = async (data, type, tourId) => {
  // console.log('updateReviews.js', data, type, tourId);
  try {
    // const url = `/api/v1/reviews/${tourId}`; // 条件がないときは直接 url に代入すればいい
    // const url = type === 'review' ? `/api/v1/reviews/${tourId}` : ''; // これは type を追加して条件で判定 例えば login or not
    // type === 'review' ? `/api/v1/reviews/${tourId}` : ''; // test for only review update

    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/reviews/${tourId}`,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
      // this is update REVIEW CARD after review POST function
      window.setTimeout(() => {
        // location.assign('/'); // this is redirect to HOME page
        location.reload(); // this is RELOAD page
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
