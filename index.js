const carsApi = "https://salim-motor-hub.onrender.com/cars"

let currentDisplayCarId = 1;

document.addEventListener('DOMContentLoaded', function() {
    const carList = document.getElementById('car-list');
    const carNameElement = document.getElementById('car-name');
    const carImageElement = document.getElementById('car-image');
    const reviewList = document.getElementById('review-list');
    const carTableBody = document.querySelector('#table tbody');
    carList.innerHTML = '';

    fetch(carsApi)
        .then((response) => response.json())
        .then(function(cars) {
            cars.forEach(function(car) {
                const li = document.createElement('li');
                li.textContent = car.name;

                li.addEventListener('click', function() {
                    fetch(`${carsApi}/${car.id}`)
                        .then((response) => response.json())
                        .then(function(carData) {
                            carNameElement.textContent = carData.name;
                            carImageElement.src = carData.image_url;
                            reviewList.innerHTML = '';
                            carData.reviews.forEach(function(review) {
                                const li = document.createElement('li');
                                li.textContent = review;
                                reviewList.appendChild(li);
                            });

                        })
                        .catch((error) => (error));
                    currentDisplayCarId = car.id;
                });
                carList.appendChild(li);
            })
        })
        .catch((error) => (error));

    fetch(`${carsApi}/${currentDisplayCarId}`)
        .then((response) => response.json())
        .then(function(carData) {
            carNameElement.textContent = carData.name;
            carImageElement.src = carData.image_url;

            const reviewForm = document.getElementById('review-form')

            reviewForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const reviewTextarea = document.getElementById('review');
                const newReview = reviewTextarea.value;
                const reviewList = document.getElementById('review-list');
                const li = document.createElement('li');
                li.textContent = newReview;
                reviewList.appendChild(li);
                reviewTextarea.value = '';
                const carId = currentDisplayCarId;
                const reviewData = { review: newReview };

                fetch(`${carsApi}/${carId}/reviews`, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(reviewData)
                    })
                    .then((response) => response.json())
                    .then((resposeData) => (resposeData))
                    .catch((error) => (error));
            });
            reviewList.innerHTML = '';
            carData.reviews.forEach(function(review) {
                const li = document.createElement('li');
                li.textContent = review;
                reviewList.appendChild(li);
            });
        })
        .catch((error) => (error));

    function clearTable() {
        carTableBody.innerHTML = '';
    }

    function populateTable(carData) {
        clearTable();
        const tr = document.createElement('tr');

        const manufacturerTd = document.createElement('td');
        manufacturerTd.textContent = carData.manufacturer;
        tr.appendChild(manufacturerTd);

        const modelTd = document.createElement('td');
        modelTd.textContent = carData.model;
        tr.appendChild(modelTd);

        const fuelTd = document.createElement('td');
        fuelTd.textContent = carData.fuel;
        tr.appendChild(fuelTd);

        const engineTd = document.createElement('td');
        engineTd.textContent = carData.engine;
        tr.appendChild(engineTd);

        const mileageTd = document.createElement('td');
        mileageTd.textContent = carData.mileage;
        tr.appendChild(mileageTd);


        const yearTd = document.createElement('td');
        yearTd.textContent = carData.year;
        tr.appendChild(yearTd);

        const nameTd = document.createElement('td');
        nameTd.textContent = carData.name;
        tr.appendChild(nameTd);
        carTableBody.appendChild(tr);
    }
    fetch(carsApi)
        .then((response) => response.json())
        .then(function(cars) {
            cars.forEach(function(car) {
                const li = document.createElement('li');
                li.textContent = car.name;

                li.addEventListener('click', function() {
                    fetch(`${carsApi}/${car.id}`)
                        .then((response) => response.json())
                        .then(function(carData) {
                            populateTable(carData);
                        })
                        .catch((error) => (error));
                });
            });
        })
        .catch((error) => console.error(error));
});