/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { signup } from './signup';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { updateReviews } from './updateReviews';
import { deleteSettings } from './deleteSettings';
import { bookTour } from './stripe';
import { showAlert } from './alerts';

// DOM ELEMENT
const mapBox = document.getElementById('map');
const signupForm = document.querySelector('.form--signup');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data'); // from account.pug form
const userPasswordForm = document.querySelector('.form-user-password'); // from account.pug form
const reviewDataForm = document.querySelector('.form-review-data'); // from tour.pug form
const reviewDelete = document.querySelector('.btn-review-delete');
const bookBtn = document.getElementById('book-tour');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log('index.js', name, email, password, passwordConfirm);
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    signup(name, email, password, passwordConfirm);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log('index.js', email, password);
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log('index.js form: ', form);

    updateSettings(form, 'data'); // これが form の POST // public/js/updateSettings.js
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...'; // this is a button text change when click password submit loading time

    const passwordCurrent = document.getElementById('password-current').value; // same as Body from postman Authentication"Update Current User Password"
    const password = document.getElementById('password').value; // same as Body from postman Authentication"Update Current User Password"
    const passwordConfirm = document.getElementById('password-confirm').value; // same as Body from postman Authentication"Update Current User Password"
    // これが form の POST // public/js/updateSettings.js
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password'; // this is a button text change when click password submit and loading after

    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

if (reviewDataForm)
  reviewDataForm.addEventListener('submit', async e => {
    e.preventDefault();
    const { tourId } = e.target.dataset;
    // console.log('index.js tourId', tourId);

    document.querySelector('.btn--review-update').textContent =
      'Review updating...'; // change button name
    const review = document.getElementById('review').value;
    const rating = document.getElementById('rating').value;
    // console.log('index.js review rating: ', review, rating);
    await updateReviews({ review, rating }, 'review', tourId); // これが form の POST // public/js/updateReviews.js
    document.querySelector('.btn--review-update').textContent = 'Save review'; // change button name
  });

if (reviewDelete)
  reviewDelete.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    // const { tourId } = e.target.dataset;
    // deleteSettings tourId;
  });

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);
