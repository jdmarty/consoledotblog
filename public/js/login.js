const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/');
    } else {
      //otherwise alert the message in the response
      const json = await response.json()
      alert(json.message);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  //collect values from the signup form
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const confirm = document.querySelector('#password-confirm').value.trim();

  //check that all forms are filled out and passwords match
  if (name && email && password && password === confirm) {
    //send POST to create endpoint
    const response = await fetch('/api/users/create', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    //if response status is OK, redirect
    if (response.ok) {
      document.location.replace('/');
    } else {
      //otherwise alert the message in the response
      const json = await response.json();
      alert(json.message);
    }
  } else {
    alert('Passwords do not match!')
  }
};

//attach event listeners
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
