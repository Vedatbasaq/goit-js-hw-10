import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('.form input[type="number"]');
const resolveInput = document.querySelector('.form input[value="fulfilled"]');

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = e.target.elements.delay.value;
  const checked = e.target.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (checked === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay} ms`);
      } else {
        reject(`❌ Rejected promise in ${delay} ms`);
      }
    }, delay);
  });

  promise
    .then(message => {
      iziToast.success({
        title: 'Success',
        message: message,
        position: 'topRight',
      });
    })
    .catch(message => {
      iziToast.error({
        title: 'Error',
        message: message,
        position: 'topRight',
      });
    });
  form.reset();
});
