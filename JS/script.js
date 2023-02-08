var username = document.getElementById('username');
var email = document.getElementById('email');
var password = document.getElementById('password');
var cpassword = document.getElementById('cpassword');

var errorUsername = document.getElementById('errorUsername');
var errorEmail = document.getElementById('errorEmail');
var errorPassword = document.getElementById('errorPassword');
var errorCPassword = document.getElementById('errorCPassword');

var container = document.querySelector('.container'),
  pwShowHide = document.querySelectorAll('.showHidePw'),
  pwFields = document.querySelectorAll('.password'),
  signUp = document.querySelector('.signup-link'),
  login = document.querySelector('.login-link');

//   js code to show/hide password and change icon
pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener('click', () => {
    pwFields.forEach((pwField) => {
      if (pwField.type === 'password') {
        pwField.type = 'text';

        pwShowHide.forEach((icon) => {
          icon.classList.replace('uil-eye-slash', 'uil-eye');
        });
      } else {
        pwField.type = 'password';

        pwShowHide.forEach((icon) => {
          icon.classList.replace('uil-eye', 'uil-eye-slash');
        });
      }
    });
  });
});

// js code to appear signup and login form
signUp.addEventListener('click', () => {
  container.classList.add('active');
});
login.addEventListener('click', () => {
  container.classList.remove('active');
});

// REGISTRATION FORM VALIDATIONS

// USERNAME
var isValidUsername = (username) => {
  var regex = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
  // console.log(username.match(regex));
  return username.match(regex);
};

username.addEventListener('input', (e) => {
  if (username.value == '') {
    errorUsername.innerHTML = 'Username is required';
  } else if (!isValidUsername(username.value)) {
    errorUsername.innerHTML =
      'Provide a valid username having alphanumeric values.';
  } else {
    errorUsername.innerHTML = '';
  }
});

// EMAIL
var isValidEmail = (email) => {
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return email.match(regex);
};

email.addEventListener('input', (e) => {
  if (email.value == '') {
    errorEmail.innerHTML = 'Email is required';
  } else if (!isValidEmail(email.value)) {
    errorEmail.innerHTML = 'Provide a valid email address.';
  } else {
    errorEmail.innerHTML = '';
  }
});

// PASSWORD
var isValidPassword = (password) => {
  var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/;
  return password.match(regex);
};

password.addEventListener('input', (e) => {
  if (password.value == '') {
    errorPassword.innerHTML = 'Password is required';
  } else if (!isValidPassword(password.value)) {
    errorPassword.innerHTML =
      'Password must be of at least 8 characters that include at least 1 lowercase, 1 uppercase, 1 special character and 1 number';
  } else {
    errorPassword.innerHTML = '';
  }
});

// CONFIRM PASSWORD
cpassword.addEventListener('input', (e) => {
  if (cpassword.value == '') {
    errorCPassword.innerHTML = 'Please confirm your password.';
  } else if (cpassword.value != password.value) {
    errorCPassword.innerHTML = 'Passwords does not match.';
  } else {
    errorCPassword.innerHTML = '';
  }
});

// REGISTRATION FORM SUBMISSION: STORE DATA IN INDEXEDDB
//Indexed DB code
var form = document.querySelector('.signupForm');

var signupAction = function () {
  var idb = indexedDB.open('Accounts', 2);

  idb.onerror = function (e) {
    console.log('Error faced!');
  };

  idb.onupgradeneeded = function () {
    var request = idb.result;
    request.createObjectStore('User', { autoIncrement: true });
  };

  var foundUsername = false;
  var foundEmail = false;

  idb.onsuccess = function (e) {
    // e.preventDefault();
    var request = idb.result;
    var tx = request.transaction('User', 'readwrite');
    var store = tx.objectStore('User');
    var cursor = store.openCursor();

    cursor.onsuccess = function () {
      let curRes = cursor.result;
      if (curRes) {
        if (curRes.value.name == form[0].value) {
          foundUsername = true;
        }
        if (curRes.value.email == form[1].value) {
          foundEmail = true;
        }
        curRes.continue();
      } else {
        if (foundUsername) {
          alert('Username already exists!');
        } else if (foundEmail) {
          alert('Email already exists!');
        } else {
          if (checkEmpty()) {
            alert('User registered successfully! Login NOW!');
            store.put({
              name: form[0].value,
              email: form[1].value,
              password: form[2].value,
              bookingHistory: [],
              // confirmPassword: form[3].value
            });
            location.reload();
          } else {
            alert('Fill up all fields!');
            e.preventDefault();
          }
        }
      }
    };
  };
};

function checkEmpty() {
  return (
    form[0].value != '' &&
    form[1].value != '' &&
    form[2].value != '' &&
    form[3].value != ''
  );
}

// LOGIN VIA INDEXED DB
var loginForm = document.querySelector('.loginForm');
var loginAction = function () {
  var idb = indexedDB.open('Accounts', 2);

  idb.onsuccess = function (e) {
    var request = idb.result;
    var tx = request.transaction('User', 'readonly');
    var store = tx.objectStore('User');
    var cursor = store.openCursor();
    cursor.onsuccess = function () {
      let currRes = cursor.result;
      if (
        (currRes.value.name == loginForm[0].value ||
          currRes.value.email == loginForm[0].value) &&
        currRes.value.password == loginForm[1].value
      ) {
        console.log(currRes.value);
        localStorage.setItem('code', 'secret');
        localStorage.setItem('userKey', JSON.stringify(currRes.key));
        window.location.href = '../pages/index.html';
      } else {
        currRes.continue();
        console.log('Enter valid details');
      }
    };
  };
};
