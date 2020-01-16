'use strict';
{
  // modal for uer edit
  function popupImage() {
    var popup = document.getElementById('js-popup');
    if(!popup) return;

    var blackBg = document.getElementById('js-black-bg');
    var closeBtn = document.getElementById('js-close-btn');
    var showBtn = document.getElementById('js-show-popup');

    closePopUp(blackBg);
    closePopUp(closeBtn);
    closePopUp(showBtn);
    function closePopUp(elem) {
      if(!elem) return;
      elem.addEventListener('click', function() {
        popup.classList.toggle('is-show');
      });
    }
  }
  popupImage();
  // エンドポイントの用意
  const postsUrl = 'https://teachapi.herokuapp.com/posts';
  const usersUrl = 'https://teachapi.herokuapp.com/users';


  // ロード時にタイムライン表示
  window.onload = function(){
    const postsParamas = {
      page: 1,
      limit: '',
      query: ''
    };
    const postsQs = new URLSearchParams(postsParamas);
    fetch(`${postsUrl}?${postsQs}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
      }
    }).then(response => {
      console.log(response);
      return response.json();
    })
    .then(json => {
      // console.log(json);
      let timeLine = '';
      json.forEach(element => {
        // console.log(element);
        timeLine +=
          `
          <div class="posted-item">
            <div class="for-img"></div>
            <div class="for-post">
              <div class="for-name-bio">
                <span class="for-name">${element.user.name}</span>
                <span class="for-bio">${element.user.bio}</span>
              </div>
              <div class="for-text">${element.text}</div>
            </div>
          </div>`;

      });
      // console.log(timeLine);
      document.querySelector('.timeline').innerHTML = timeLine;
      // for(let i = 0, len = json.length; i < len; i++){ //失敗の跡地
      //   document.querySelector('.timeline').innerHTML = `
      //   <div class="posted-item">
      //     <div class="for-img"></div>
      //     <div class="for-post">
      //       <div class="for-name-bio">
      //         <span class="for-name"></span>
      //         <span class="for-bio"></span>
      //       </div>
      //       <div class="for-text"></div>
      //     </div>
      //   </div>`;
      // //   document.querySelector('.for-name').textContent = json[i].user.name;
      //   document.querySelector('.for-bio').textContent = json[i].user.bio;
      //   document.querySelector('.for-text').textContent = json[i].text;
      //   const posts_prime = document.querySelector('.posted-item').cloneNode(true);
      //   document.querySelector('.timeline').appendChild(posts_prime);
      // }
    })
    .catch(error => {
      console.error(error);
    })
  };

  // 投稿作成
  document.getElementById('post_submit').addEventListener('click', (e) => {
    e.preventDefault();
    const postParams = {
      post_params: {
        text: document.getElementById('post_text').value
      }
    };
    fetch(postsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
      },
      body: JSON.stringify(postParams)
    }).then(response => response.json())
    .then(json => {
      console.log(json);
      window.alert('投稿しました');
      location.reload();
    }).catch(error => {
      console.error(error);
    })
  });

    // ユーザー編集
    const usersEditUrl = `${usersUrl}/${localStorage.id}`;
    document.getElementById('users_edit_submit').addEventListener('click', (e) => {
      e.preventDefault();
      const userEditParams = {
        user_params: {
          name: document.getElementById('users_edit_name').value,
          bio: document.getElementById('users_edit_bio').value
        }
      };
      fetch(usersEditUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        },
        body: JSON.stringify(userEditParams)
      }).then(response => response.json())
      .then(json => {
        console.log(json);

      }).catch(error => {
        console.error(error);
      })
    });

    // ユーザー削除
    document.getElementById('users_delete_submit').addEventListener('click', (e) => {
      e.preventDefault();
      if (window.confirm('本当に削除してよろしいですか？')) {
        fetch(usersEditUrl, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
          }
        }).then(response => response.json())
        .then(json => {
          console.log(json)
          window.alert('ご利用ありがとうございました');
          location.href = 'index.html';
        }).catch(error => {
          console.error(error);
        })
      } else {
        window.alert('引き続きお楽しみ下さい');
        location.href = 'timeline.html';
      }
    });
  
}