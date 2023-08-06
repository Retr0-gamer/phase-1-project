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

    carTableBody.innerHTML = '';

    const tr = document.createElement('tr');
    carTableBody.appendChild(tr);

    function updateDisplayedCar(carId) {
        currentDisplayCarId = carId;
        const carData = carDataList.find((car) => car.id === carId);
        if (carData) {
            populateTableWithData(carData);
        } else {
            console.error(`Car with ID ${carId} not found.`);
        }
    }

    function handleCarListItemClick(carId) {
        updateDisplayedCar(carId);
    }
    fetch(carsApi)
        .then((response) => response.json())
        .then(function(cars) {
            carDataList = cars;
            const carList = document.getElementById('car-list');
            cars.forEach(function(car) {
                const li = document.createElement('li');
                li.textContent = car.name;

                li.addEventListener('click', function() {
                    handleCarListItemClick(car.id);
                });

                carList.appendChild(li);
            });
            updateDisplayedCarpdateDisplayedCar(currentDisplayCarId);
        })
        .catch((error) => console.error(error));


});