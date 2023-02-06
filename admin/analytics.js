var ctx = document.getElementById('myChart').getContext('2d');
var ctx1 = document.getElementById('myChart1').getContext('2d');
var ctx2 = document.getElementById('myChart2').getContext('2d');
var ctx3 = document.getElementById('myChart3').getContext('2d');

var carValues = [];
var dayValues = [];
var revenueValues = [];

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
        carValues.push(curRes.value.carName);
        dayValues.push(curRes.value.days);
        revenueValues.push(curRes.value.revenue);
        curRes.continue();
      } else {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: carValues,
            datasets: [
              {
                label: 'Days Booked',
                backgroundColor: 'rgba(124, 148, 215,0.6)',
                data: dayValues,
              },
            ],
          },
          // options: {
          //   title: {
          //     display: true,
          //     text: 'Car Booking Day Count',
          //   },
          // },
        });

        new Chart(ctx3, {
          type: 'bar',
          data: {
            labels: carValues,
            datasets: [
              {
                label: 'Revenue Generated Per Vehicle',
                backgroundColor: 'rgba(124, 148, 215,0.6)',
                data: revenueValues,
              },
            ],
          },
          options: {
            // title: {
            //   display: true,
            //   text: 'Car Booking Revenue',
            // },
          },
        });
      }
    };
  };
  // console.log(xValues);
  // console.log(yValues);
}

read();

var myChart1 = new Chart(ctx1, {
  type: 'bar',
  data: {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Number of bookings in month',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    // title: {
    //   display: true,
    //   text: 'Number of bookings in month',
    // },
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});

var userValues = [];
var bookingValues = [];
var totalPayValues = [];
function getData() {
  var idb = indexedDB.open('Accounts', 2);
  idb.onsuccess = function () {
    var res = idb.result;
    var tx = res.transaction('User', 'readonly');
    var store = tx.objectStore('User');
    var cursor = store.openCursor();
    cursor.onsuccess = function () {
      var curRes = cursor.result;
      if (curRes) {
        userValues.push(curRes.value.name);
        // console.log(curRes.value.bookingHistory.length);
        // bookingValues.push(curRes.value.bookingHistory.length);
        curRes.continue();
      } else {
        new Chart(ctx2, {
          type: 'bar',
          data: {
            labels: userValues,
            datasets: [
              {
                label: 'Bookings by Users',
                backgroundColor: 'rgba(124, 148, 215,0.6)',
                data: bookingValues,
              },
            ],
          },
          options: {
            // title: {
            //   display: true,
            //   text: 'Bookings by Users',
            // },
          },
        });
      }
    };
  };
}

getData();
