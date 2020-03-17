// Fetch forecast data


// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error);
//         } else {
//             console.log(data.location);
//             console.log(data.forecast);
//         }
//     });
// });

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const userLocation = document.querySelector('#location');
const userForecast = document.querySelector('#forecast');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchInput.value;

    userLocation.textContent = 'Loading...';
    userForecast.textContent = '';

    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            userLocation.textContent = data.error;
        } else {
            userLocation.textContent = data.location;
            userForecast.textContent = data.forecast;
        }
    });
});
});