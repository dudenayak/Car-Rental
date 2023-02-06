// console.log(JSON.parse(localStorage.getItem('carDetails')));
var rentCar = JSON.parse(localStorage.getItem('carDetails'));
var car_container = document.querySelector('.car_container');
// var pickupDate = localStorage.getItem('pickup');
// var returnDate = localStorage.getItem('return');
// var d1 = document.getElementById('d1').value;
// var d2 = document.getElementById('d2').value;
// var dateOne = new Date(d1);
// var dateTwo = new Date(d2);
// var time = Math.abs(dateTwo - dateOne);
// var days = Math.ceil(time / (1000 * 60 * 60 * 24));
// function days
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
                        <img src="./assets/images/car-1.jpg" alt="Toyota RAV4 2021" loading="lazy" width="440"
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
<form action="">
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
var total = document.getElementById('displayTotal');
const getDays = function () {
  var d1 = document.getElementById('d1').value;
  var d2 = document.getElementById('d2').value;
  var dateOne = new Date(d1);
  var dateTwo = new Date(d2);
  var time = Math.abs(dateTwo - dateOne);
  var days = Math.ceil(time / (1000 * 60 * 60 * 24));
  var totalPrice = parseInt(rentCar.carPrice) * 24 * days;
  console.log(d1);
  console.log(d2);
  console.log(time);
  console.log(totalPrice);
  total.innerHTML = 'Your total fare is: ₹' + totalPrice;
};

// const carBooked = function () {
//     localStorage.setItem
// };
