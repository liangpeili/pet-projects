const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.remove('success');
  formControl.classList.add('error');
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.remove('error');
  formControl.classList.add('success');
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

function checkRequired(items) {
  items.forEach(item => {
    if (!item.value.trim()) {
      showError(item, `${getFieldName(item)} is required`);
    } else {
      showSuccess(item);
    }
  })
}

function checkEmail(input) {
  const email = input.value;
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(email).toLowerCase())) {
    showError(input, `Email is not valid`);
  } else {
    showSuccess(input);
  }
}

function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, `Password do not match`)
  }
}

function getFieldName(input) {
  const id = input.id;
  return id[0].toUpperCase() + id.slice(1);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2])
  checkLength(username, 3, 20);
  checkLength(password, 6, 30);
  checkEmail(email);
  checkPasswordMatch(password, password2);
})