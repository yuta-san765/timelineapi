'use strict';
{
  const fetchWrap = (divName, method, isTokenExist, url, params) => {
    const render = (Response) => {
      const p = document.createElement("p");
      p.textContent = JSON.stringify(Response);
      const div = document.querySelector(`.${divName}`);
      div.appendChild(p);
    }

    if (!isTokenExist) {
      fetch(url, {
        method: method,
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(Response => Response.json())
      .then(json => { //response
        console.log(json); //console.log(JSON.stringfy(response))
        localStorage.token = json.token;
        render(json);
      })
      .catch(error => {
        console.error(error);
        render(json);
      })
    } else if (params) {
      fetch(url, {
        method: method,
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(Response => Response.json())
      .then(json => {
        console.log(json);
        render(json);
      })
      .catch(error => {
        console.error(error);
        render(json);
      })
    } else {
      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(Response => Response.json())
      .then(json => {
        console.log(json);
        render(json);
      })
      .catch(error => {
        console.error(error);
        render(json);
      })
    }
  }

  // ユーザー登録
  document.getElementById("sign_up_submit").addEventListener("click", (event) => {
    event.preventDefault();
    const signUpUrl = 'https://teachapi.herokuapp.com/sign_up';
    const signUpParams = {
      sign_up_user_params: {
        name: document.getElementById("sign_up_name").nodeValue,
        bio: document.getElementById("sign_up_bio").nodeValue,
        email: document.getElementById("sign_up_email").nodeValue,
        password: document.getElementById("sign_up_password").nodeValue,
        password_confirmation: document.getElementById("sign_up_password_confirmation").nodeValue
      }
    };
    fetchWrap("sign_up", "POST", false, signUpUrl, signUpParams);
  });

  // ユーザーログイン
  document.getElementById("sign_in_submit").addEventListener("click", (event) => {
    event.preventDefault();
    const signInUrl = 'https://teachapi.herokuapp.com/sign_in';
    const signInParams = {
      sign_in_user_params: {
        email: document.getElementById("sign_in_email").nodeValue,
        password: document.getElementById("sign_in_password").nodeValue,
        password_confirmation: document.getElementById("sign_in_password_confirmation").nodeValue
      }
    };
    fetchWrap("sign_in", "POST", false, signInUrl, signInParams);
  });

  // ユーザー一覧
  document.getElementById("users_submit").addEventListener("click", (event) => {
    event.preventDefault();
    const usersUrl = 'https://teachapi.herokuapp.com/users';
    const usersParams = {
      page: document.getElementById("users_page").nodeValue,
      limit: document.getElementById("users_limit").nodeValue,
      query: document.getElementById("users_query").nodeValue
    };
    const usersQs = new URLSearchParams(usersParams);
    fetchWrap("users", "GET", true, `${usersUrl}?${usersQs}`);
  });

  // ユーザー編集
  document.getElementById("user_edit_submit").addEventListener("click", (event) => {
    event.preventDefault();
    const userEditUrl = `https://teachapi.herokuapp.com/users/${document.getElementById("user_edit_id").nodeValue}`;
    const userEditParams = {
      user_params: {
        name: document.getElementById("user_edit_name").nodeValue,
        bio: document.getElementById("user_edit_bio").nodeValue
      }
    };
    fetchWrap("user_edit", "PUT", true, userEditUrl, userEditParams);
  });

  // ユーザー削除
  document.getElementById("delete_submit").addEventListener("click", (event) => {
    event.preventDefault();
    const deleteUrl = `https://teachapi.herokuapp.com/users/${document.getElementById("delete_id").nodeValue}`;
    fetchWrap("deleteUrl", "DELETE", true, deleteUrl);
  });

  // ユーザーのタイムライン
  document.getElementById("timeline_submit").addEventListener("click", (event) => {
    event.preventDefault();
    const timelineUrl = `https://teachapi.herokuapp.com/users/${document.getElementById("timeline_id").nodeValue}/timeline`;
    const timelineParams = {
      page: document.getElementById("timeline_page").nodeValue,
      limit: document.getElementById("timeline_limit").nodeValue,
      query: document.getElementById("timeline_query").nodeValue
    };
    const timelineQs = new URLSearchParams(timelineParams);
    fetchWrap("timeline", "GET", true, `${timelineUrl}?${timelineQs}`);
  });

  // 投稿作成
  document.getElementById("post_submit").addEventListener("click", (event) => {
    event.preventDefault();
    const postUrl = 'https://teachapi.herokuapp.com/posts';
    const postParams = {
      post_params: {
        text: document.getElementById("post_text").nodeValue,
      }
    };
    fetchWrap("post", "POST", true, postUrl, postParams);
  });

  // 投稿編集
  document.getElementById("edit_post_submit").addEventListener("click", (event) => {
    event.preventDefault();
    const editPostUrl = `https://teachapi.herokuapp.com/posts/${document.getElementById("edit_post_id").nodeValue}`;
    const editPostParams = {
      post_params: {
        text: document.getElementById("edit_post_text").nodeValue
      }
    };
    fetchWrap("edit_post", "PUT", true, editPostUrl, editPostParams);
  });

  // 投稿削除
  document.getElementById("delete_post_submit").addEventListener("click", (event) => {
    event.preventDefault();
    const deletePostUrl = `https://teachapi.herokuapp.com/posts/${document.getElementById("delete_post_id").nodeValue}`;
    fetchWrap("delete_post", "DELETE", ture, deletePostUrl);
  });

  // 投稿一覧
  document.getElementById("all_posts_submit").addEventListener("click", (event) => {
    event.preventDefault();
    const allPostsUrl = 'https://teachapi.herokuapp.com/posts';
    const allPostsParamas = {
      page: document.getElementById("all_posts_page").nodeValue,
      limit: document.getElementById("all_posts_limit").nodeValue,
      query: document.getElementById("all_posts_query").nodeValue
    };
    const allPostsQs = new URLSearchParams(allPostsParamas);
    fetchWrap("allPostsUrl", "GET", true, `${allPostsUrl}?${allPostsQs}`);
  });
}