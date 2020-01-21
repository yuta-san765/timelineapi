'use strict';
{
  // modal for signup
  function popupImage() {
    const popup = document.getElementById('js-popup');
    if(!popup) return;

    const blackBg = document.getElementById('js-black-bg');
    const closeBtn = document.getElementById('js-close-btn');
    const showBtn = document.getElementById('js-show-popup');

    clsoePopUp(blackBg);
    clsoePopUp(closeBtn);
    clsoePopUp(showBtn);
    function clsoePopUp(elem) {
      if(!elem) return;
      elem.addEventListener('click', function() {
        popup.classList.toggle('is-show');
      });
    }
  }
  popupImage();

  // API エンドポイントの用意
  const urlSignUp = 'https://teachapi.herokuapp.com/sign_up';
  const urlSignIn = 'https://teachapi.herokuapp.com/sign_in';
  const urlPosts = 'https://teachapi.herokuapp.com/posts';
  const urlUsers = 'https://teachapi.herokuapp.com/users';

  // ユーザー登録
  document.getElementById('sign_up_submit').addEventListener('click', (e) => {
    e.preventDefault();
    //  localStorage.clear();
    const signUpParams = {
      sign_up_user_params: {
        name: document.getElementById('sign_up_name').value,
        bio: document.getElementById('sign_up_bio').value,
        email: document.getElementById('sign_up_email').value,
        password: document.getElementById('sign_up_password').value,
        password_confirmation: document.getElementById('sign_up_password_confirmation').value
      }
    };
    fetch(urlSignUp, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signUpParams)
    }).then(response => response.json())
    .then(json => {
      console.log(json);
      localStorage.token = json.token;
      localStorage.id = json.id;
      localStorage.name = json.name;
      localStorage.bio = json.bio;
      location.href = 'timeline.html';
    }).catch(error => console.error(error))
  });

  // ユーザーログイン
  document.getElementById('sign_in_submit').addEventListener('click', (e) => {
    e.preventDefault();
    const signInParams = {
      sign_in_user_params: {
        email: document.getElementById('sign_in_email').value,
        password: document.getElementById('sign_in_password').value,
        password_confirmation: document.getElementById('sign_in_password_confirmation').value
      }
    };
    fetch(urlSignIn, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(signInParams)
    }).then(response => response.json())
    .then(json => {
      console.log(json);
      localStorage.token = json.token;
      localStorage.id = json.id;
      localStorage.name = json.name;
      localStorage.bio = json.bio;
      location.href = 'timeline.html';
    }).catch(error => {
      console.error(error);
    })
  });
}