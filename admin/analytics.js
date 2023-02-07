var ctx = document.getElementById('myChart').getContext('2d');
var ctx1 = document.getElementById('myChart1').getContext('2d');
var ctx2 = document.getElementById('myChart2').getContext('2d');
var ctx3 = document.getElementById('myChart3').getContext('2d');
var ctx4 = document.getElementById('myChart4').getContext('2d');
var ctx5 = document.getElementById('myChart5').getContext('2d');

var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

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
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(125, 19, 4, 0.2)',
                  'rgba(55, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(125, 19, 4, 1)',
                  'rgba(55, 159, 64, 1)',
                ],
                borderWidth: 1,
                data: dayValues,
              },
            ],
          },
        });

        new Chart(ctx3, {
          type: 'bar',
          data: {
            labels: carValues,
            datasets: [
              {
                label: 'Revenue Generated Per Vehicle',
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(125, 19, 4, 0.2)',
                  'rgba(55, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(125, 19, 4, 1)',
                  'rgba(55, 159, 64, 1)',
                ],
                borderWidth: 1,
                data: revenueValues,
              },
            ],
          },
        });

        new Chart(ctx4, {
          type: 'bar',
          data: {
            labels: carValues,
            datasets: [
              {
                label: 'Number of times car booked',
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(125, 19, 4, 0.2)',
                  'rgba(55, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(125, 19, 4, 1)',
                  'rgba(55, 159, 64, 1)',
                ],
                borderWidth: 1,
                data: revenueValues,
              },
            ],
          },
        });
      }
    };
  };
}

read();

// var myChart1 = new Chart(ctx1, {
//   type: 'bar',
//   data: {
//     labels: [
//       'Jan',
//       'Feb',
//       'Mar',
//       'Apr',
//       'May',
//       'Jun',
//       'Jul',
//       'Aug',
//       'Sep',
//       'Oct',
//       'Nov',
//       'Dec',
//     ],
//     datasets: [
//       {
//         label: 'Number of bookings in month',
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   },
//   options: {
//     responsive: true,
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//   },
// });

var userValues = [];
var bookingValues = [];
var totalPayValues = [];
var monthwiseBookings = [];
var monthCount = {};

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
        bookingValues.push(
          curRes.value.bookingHistory ? curRes.value.bookingHistory.length : 0
        );
        var userBookings = curRes.value.bookingHistory; // total amount spend by user
        var sum = userBookings.reduce(function (acc, curr) {
          return acc + curr.totalPay;
        }, 0);
        totalPayValues.push(sum);

        // monthwise booking
        var count = userBookings.reduce(function (acc, curr) {
          var month = curr.pickupDate.split('-')[1];
          if (!acc[month]) {
            acc[month] = 1;
          } else {
            acc[month]++;
          }
          return acc;
        }, {});
        monthwiseBookings.push(count);
        curRes.continue();
      } else {
        // console.log(userValues);
        new Chart(ctx2, {
          type: 'bar',
          data: {
            labels: userValues,
            datasets: [
              {
                label: 'Bookings by Users',
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(125, 19, 4, 0.2)',
                  'rgba(55, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(125, 19, 4, 1)',
                  'rgba(55, 159, 64, 1)',
                ],
                borderWidth: 1,
                data: bookingValues,
              },
            ],
          },
          options: {
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

        new Chart(ctx5, {
          type: 'bar',
          data: {
            labels: userValues,
            datasets: [
              {
                label: 'Total money spent by an user',
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(125, 19, 4, 0.2)',
                  'rgba(55, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(125, 19, 4, 1)',
                  'rgba(55, 159, 64, 1)',
                ],
                borderWidth: 1,
                data: totalPayValues,
              },
            ],
          },
        });
        monthwiseBookings.forEach(function (obj) {
          Object.keys(obj).forEach(function (month) {
            var monthName = months[month - 1];

            if (!monthCount[monthName]) {
              monthCount[monthName] = 0;
            }
            monthCount[monthName] += obj[month];
          });
        });
        console.log(monthCount);

        new Chart(ctx1, {
          type: 'bar',
          data: {
            labels: Object.keys(monthCount),
            datasets: [
              {
                label: 'Monthly Bookings',
                data: Object.values(monthCount),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(125, 19, 4, 0.2)',
                  'rgba(55, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(125, 19, 4, 1)',
                  'rgba(55, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
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
        //
      }
    };
  };
}

getData();
