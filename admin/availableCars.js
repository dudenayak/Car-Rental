// DISPLAYING ALL CAR INFO
var divContainer = document.querySelector('.carContainer');

function read() {
  var idb = indexedDB.open('Cars', 2);
  idb.onsuccess = function () {
    let res = idb.result;
    let tx = res.transaction('CarsData', 'readonly');
    let store = tx.objectStore('CarsData');
    let cursor = store.openCursor();

    cursor.onsuccess = function () {
      let curRes = cursor.result;
      if (curRes) {
        // console.log(curRes.value.carName);
        divContainer.innerHTML += `
        <ul class="featured-car-list">
        <li>
            <div class="featured-car-card" >
            <figure class="card-banner">
                        <img src="../assets/images/car-1.jpg" alt="Toyota RAV4 2021" loading="lazy" width="440"
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
