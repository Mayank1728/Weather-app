console.log('Client Side JavaScript is working!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
let msgOne = document.querySelector('#msgOne');
let msgTwo = document.querySelector('#msgTwo');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  msgOne.textContent = 'Loading...';
  msgTwo.textContent = '';
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          return (msgOne.textContent = data.error);
        }
        msgOne.textContent = `${data.temperature}C, its ${data.description}`;
        msgTwo.textContent = `Weather for ${data.loc}`;
      });
    },
  );
});
