const usernameElement = document.getElementById('username');
const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');
const password2Element = document.getElementById('password2');
const buttonElement = document.querySelector('button');

function showError(input, message) {
  const smallElement = input.parentElement.childNodes[5];
  input.classList.add('error');
  smallElement.classList.add('error');
  smallElement.innerText = message;
}

function showSuccess(input) {
  const smallElement = input.parentElement.childNodes[5];
  smallElement.classList.remove('error');
  input.classList.remove('error');
  input.classList.add('success');
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `Length must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `Length must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

function checkRequired(items) {
  items.forEach(item => {
    if (!item.value) {
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

function checkPassword(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, `Password is not the same`)
  }
}

function getFieldName(input) {
  const id = input.id;
  return id[0].toUpperCase() + id.slice(1);
}

buttonElement.addEventListener('click', function (e) {
  e.preventDefault();

  checkRequired([usernameElement, emailElement, passwordElement, password2Element])
  checkLength(usernameElement, 3, 20);
  checkLength(passwordElement, 6, 30);
  checkEmail(emailElement);
  checkPassword(passwordElement, password2Element);
})