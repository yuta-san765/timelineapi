'use strict';
{
  // ロード時にタイムライン表示
  window.onload = function(){
    const postsUrl = 'https://teachapi.herokuapp.com/posts';
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
  }
}