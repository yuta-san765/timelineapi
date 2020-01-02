'use strict';
{
  // ユーザー登録
  const urlSignup = 'https://teachapi.herokuapp.com/users/sign_up';
  const name = document.getElementById('signupName').value;
  const bio = document.getElementById('signupBio').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const password_confirmation = document.getElementById('signupPassword_confirmation').value;

  const sign_up_user_params = {
    "sign_up_user_params": {
    "name": name,
    "bio": bio,
    "email": email,
    "password": password,
    "password_confirmation": password_confirmation
    }
  }
  const signupQs = JSON.stringify(sign_up_user_params);
  fetch(urlSignup, {
    method: 'POST',
    headers: 'Content-type: application/json',
    body: signupQs
  })
  .then(response => response.json())
  .then(json => {
    console.log(JSON.stringify(json));
    localStorage.token = json.token;

  })
  .catch(error => {
    console.error(error);
  })
}