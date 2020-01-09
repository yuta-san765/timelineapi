'use strict';
{
  // API エンドポイントの用意
  const urlSignUp = 'https://teachapi.herokuapp.com/sign_up';
  const urlSignIn = 'https://teachapi.herokuapp.com/sign_in';
  const urlPosts = 'https://teachapi.herokuapp.com/posts';
  const urlUsers = 'https://teachapi.herokuapp.com/users';

  // ユーザー登録
  document.getElementById('sign_up_submit').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.clear();
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
    }).catch(error => {
      console.error(error);
    })
  });

  // ユーザー一覧
  document.getElementById('users_submit').addEventListener('click', (e) => {
    e.preventDefault();
    const usersParams = {
      pages: document.getElementById('users_page').value,
      limit: document.getElementById('users_limit').value,
      query: document.getElementById('users_query').value
    };
    const usersQS = new URLSearchParams(usersParams);
    fetch(`${urlUsers}?${usersQS}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
      }
    }).then(response => response.json())
    .then(json => {
      console.log(json);
      document.querySelector('.users p').textContent = JSON.stringify(json);
    }).catch(error => {
      console.error(error);
    })
  });

  // ユーザー編集
  const urlUsersEdit = `${urlUsers}/${localStorage.id}`;
  document.getElementById('users_edit_submit').addEventListener('click', (e) => {
    e.preventDefault();
    const userEditParams = {
      user_params: {
        name: document.getElementById('users_edit_name').value,
        bio: document.getElementById('users_edit_bio').value
      }
    };
    fetch(urlUsersEdit, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
      },
      body: JSON.stringify(userEditParams)
    }).then(response => response.json())
    .then(json => {
      console.log(json);
      document.querySelector('.users_edit p').textContent = JSON.stringify(json);
    }).catch(error => {
      console.error(error);
    })
  });

  // ユーザー削除
  document.getElementById('user_delete_submit').addEventListener('click', (e) => {
    e.preventDefault();
    if (window.confirm('本当に削除してよろしいですか？')) {
      fetch(urlUsersEdit, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(response => response.json())
      .then(json => {
        console.log(json)
        document.querySelector('.users_delete p').textContent = 'ユーザー削除しました';
      }).catch(error => {
        console.error(error);
      })
    } else {
      document.querySelector('.users_delete p').textContent = '引き続きお楽しみください';
    }

  });


}