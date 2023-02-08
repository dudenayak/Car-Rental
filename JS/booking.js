var rentCar = JSON.parse(localStorage.getItem('carDetails'));
var car_container = document.querySelector('.car_container');
var carKey = JSON.parse(localStorage.getItem('carKey'));
function getItem() {
  if (rentCar.length != 0) {
    car_container.innerHTML = `
    <section class="section featured-car">
        <div class="title-wrapper">
        <h2 class="h2 section-title">
            Book <strong>${rentCar.carName}</strong> right away</h2>
            </div>
    <ul class="featured-car-list">
        <li>
            <div class="featured-car-card" >
            <figure class="card-banner">
                        <img src="../assets/images/car-1.jpg" alt="Toyota RAV4 2021" loading="lazy" width="440"
                            height="300" class="w-100">
                            <a href="#">${rentCar.carImage}</a>
                    </figure>
                <div class="card-content">
                    <div class="card-title-wrapper">
                        <h3 class="h3 card-title">
                            <a href="#">${rentCar.carName}</a>
                        </h3>
                        <data class="year" value="2021">${rentCar.carYear}</data>
                    </div>
                    
                    <ul class="card-list">

                        <li class="card-list-item">
                            <ion-icon name="people-outline"></ion-icon>
                            <span class="card-item-text">${rentCar.carSpace} People</span>
                        </li>

                        <li class="card-list-item">
                            <ion-icon name="flash-outline"></ion-icon>

                            <span class="card-item-text">${rentCar.carType}</span>
                        </li>

                        <li class="card-list-item">
                            <ion-icon name="speedometer-outline"></ion-icon>

                            <span class="card-item-text">${rentCar.carAvg}km / 1-litre</span>
                        </li>

                        <li class="card-list-item">
                            <ion-icon name="hardware-chip-outline"></ion-icon>

                            <span class="card-item-text">${rentCar.carMode}</span>
                        </li>

                    </ul>

                    <div class="card-price-wrapper">

                        <p class="card-price">
                            <strong>₹${rentCar.carPrice}</strong> / hour
                        </p>                       
                    </div>

                </div>

            </div>
        </li>
    </ul>    
    <h1 id="displayTotal">Your total fare is: ₹ </h1>    
</section>
<div class="form-container">
<form class="bookingForm" action="">
    <div class="input-box">
        <span>Pick-Up Date</span>
        <input type="date" id="d1">
    </div>
    <div class="input-box">
        <span>Return Date</span>
        <input type="date" id="d2">
    </div>    
    <input type="button" value="Calculate fare" class="button" onclick="getDays()">    
</form>
</div>
<div class="form-container">
<input type="button" value="Book now" class="button" onclick="carBooked()">
</div>
</div>
`;
  }
}
getItem();

// Calculating total fare of car rented
var total = document.getElementById('displayTotal');
var form = document.querySelector('.bookingForm');
var getDays = function () {
  var d1 = document.getElementById('d1').value;
  var d2 = document.getElementById('d2').value;
  var dateOne = new Date(d1);
  var dateTwo = new Date(d2);

  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var time = dateTwo.getTime() - dateOne.getTime();
  var days = time / (1000 * 3600 * 24);
  if (
    time <= 0 ||
    !isValidDate(dateOne) ||
    !isValidDate(dateTwo) ||
    today > dateOne
  ) {
    alert('Enter valid dates!');
  } else {
    var totalPrice = parseInt(rentCar.carPrice) * 24 * days;
    total.innerHTML = 'Your total fare is: ₹' + totalPrice;
    // console.log(totalPrice);
  }
};

var isValidDate = function (date) {
  return date instanceof Date && !isNaN(date);
};
// var carBooked = function () {
//     localStorage.setItem
// };

var carBooked = function () {
  var d1 = document.getElementById('d1').value;
  var d2 = document.getElementById('d2').value;
  var dateOne = new Date(d1);
  var dateTwo = new Date(d2);
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var time = dateTwo.getTime() - dateOne.getTime();
  var days = time / (1000 * 3600 * 24);
  if (
    time <= 0 ||
    !isValidDate(dateOne) ||
    !isValidDate(dateTwo) ||
    today > dateOne
  ) {
    alert('Enter valid dates!');
  } else {
    var totalPrice = parseInt(rentCar.carPrice) * 24 * days;
    rentCar.revenue = totalPrice;
    rentCar.days = days;
    localStorage.setItem('carDetails', JSON.stringify(rentCar));
    updateCarDetails(totalPrice, days);
    updateUserDetails(rentCar, d1, d2);
    alert('Booking successful!');
    location.href = '../pages/myride.html';
  }
};

// function to update for particular car key to update information
function updateCarDetails(price, bookingDays) {
  var idb = indexedDB.open('Cars', 2);
  idb.onsuccess = function (e) {
    var request = idb.result;
    var tx = request.transaction('CarsData', 'readwrite');
    var store = tx.objectStore('CarsData');

    // Retrieving record using its keys
    var getRequest = store.get(carKey);
    getRequest.onsuccess = function (event) {
      var record = event.target.result;

      // Modify the record
      record.revenue += price;
      record.days += bookingDays;
      // console.log(record.days);

      store.put(record, carKey);
    };
  };
}

// function to update users car history
var userKey = JSON.parse(localStorage.getItem('userKey'));
function updateUserDetails(rentCar, pickupDate, returnDate) {
  var idb = indexedDB.open('Accounts', 2);
  idb.onsuccess = function (e) {
    var request = idb.result;
    var tx = request.transaction('User', 'readwrite');
    var store = tx.objectStore('User');

    // Retrieving record using user key
    var getData = store.get(userKey);
    getData.onsuccess = function (event) {
      var record = event.target.result;

      // Modify the record
      record.bookingHistory.push({
        model: rentCar.carName,
        days: rentCar.days,
        totalPay: rentCar.revenue,
        pickupDate: pickupDate.toLocaleString().split(',')[0],
        returnDate: returnDate.toLocaleString().split(',')[0],
      });

      store.put(record, userKey);
    };
  };
}
