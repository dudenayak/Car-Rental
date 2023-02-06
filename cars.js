const carForm = document.querySelector('.carForm');
const car_container = document.querySelector('.car_container');

const carsData = function () {
  var idb = indexedDB.open('Cars', 2);

  idb.onerror = function (e) {
    console.log('Error faced!');
  };

  idb.onupgradeneeded = function () {
    var request = idb.result;
    request.createObjectStore('CarsData', { autoIncrement: true });
  };

  idb.onsuccess = function (e) {
    // e.preventDefault();
    var request = idb.result;
    var tx = request.transaction('CarsData', 'readwrite');
    var store = tx.objectStore('CarsData');
    if (checkEmpty()) {
      alert('Car added successfully!');
      store.put({
        carName: carForm[0].value,
        carYear: carForm[1].value,
        carSpace: carForm[2].value,
        carType: carForm[3].value,
        carAvg: carForm[4].value,
        carMode: carForm[5].value,
        carPrice: carForm[6].value,
        carImage: carForm[7].value,
      });
      location.reload();
    } else {
      alert('Fill up all fields!');
      e.preventDefault();
    }
  };
};

function checkEmpty() {
  return (
    carForm[0].value != '' &&
    carForm[1].value != '' &&
    carForm[2].value != '' &&
    carForm[3].value != '' &&
    carForm[4].value != '' &&
    carForm[5].value != '' &&
    carForm[6].value != '' &&
    carForm[7].value != ''
  );
}

var rentKey;
var carDetails;
const rent = function (key) {
  // console.log('rent action triggered');
  rentKey = key;
  console.log(rentKey);
  var idb = indexedDB.open('Cars', 2);
  idb.onsuccess = function () {
    var request = idb.result;
    var transaction = request.transaction('CarsData', 'readwrite');
    var store = transaction.objectStore('CarsData');
    const data = store.get(rentKey);
    // console.log(data);
    data.onsuccess = function (event) {
      // console.log(event.target.result);
      carDetails = event.target.result;
      console.log(carDetails);
      localStorage.setItem('carDetails', JSON.stringify(carDetails));
      localStorage.setItem('carKey', JSON.stringify(rentKey));
    };
  };
  location.href = 'booking.html';
};

function read() {
  var idb = indexedDB.open('Cars', 2);
  idb.onsuccess = function () {
    var res = idb.result;
    var tx = res.transaction('CarsData', 'readonly');
    var store = tx.objectStore('CarsData');
    var cursor = store.openCursor();
    cursor.onsuccess = function () {
      var curRes = cursor.result;
      if (curRes) {
        // console.log(curRes);
        car_container.innerHTML += `
        
    
        <ul class="featured-car-list">
        <li>
            <div class="featured-car-card" >
            <figure class="card-banner">
                        <img src="./assets/images/car-1.jpg" alt="Toyota RAV4 2021" loading="lazy" width="440"
                            height="300" class="w-100">
                            <a href="#">${curRes.value.carImage}</a>
                    </figure>
                <div class="card-content">
                    <div class="card-title-wrapper">
                        <h3 class="h3 card-title">
                            <a href="#">${curRes.value.carName}</a>
                        </h3>
                        <data class="year" value="2021">${curRes.value.carYear}</data>
                    </div>
                    
                    <ul class="card-list">

                        <li class="card-list-item">
                            <ion-icon name="people-outline"></ion-icon>
                            <span class="card-item-text">${curRes.value.carSpace} People</span>
                        </li>

                        <li class="card-list-item">
                            <ion-icon name="flash-outline"></ion-icon>

                            <span class="card-item-text">${curRes.value.carType}</span>
                        </li>

                        <li class="card-list-item">
                            <ion-icon name="speedometer-outline"></ion-icon>

                            <span class="card-item-text">${curRes.value.carAvg}km / 1-litre</span>
                        </li>

                        <li class="card-list-item">
                            <ion-icon name="hardware-chip-outline"></ion-icon>

                            <span class="card-item-text">${curRes.value.carMode}</span>
                        </li>

                    </ul>

                    <div class="card-price-wrapper">

                        <p class="card-price">
                            <strong>₹${curRes.value.carPrice}</strong> / hour
                        </p>

                        <button class="btn fav-btn" aria-label="Add to favourite list">
                            <ion-icon name="heart-outline"></ion-icon>
                        </button>

                        <button class="btn" onclick="rent(${curRes.key})">Rent now</button>

                    </div>

                </div>

            </div>
        </li>
    </ul>
    
  
        `;
        curRes.continue();
      }
    };
  };
}
read();
