const carForm = document.querySelector('.carForm');
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
        days: 0,
        revenue: 0,
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
