'use strict';
{
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
      console.log(json);
      document.querySelector('posted-items').removeAttribute('hidden');
      for(let i = 0, len = json.length; i < len; i++){
        document.querySelector('for-name').textContent = json[i].user.name;
        document.querySelector('for-bio').textContent = json[i].user.bio;
        document.querySelector('for-text').textContent = json[i].text;
        const posts_prime = document.querySelector('posted-items').cloneNode(true);
        document.main.appendChild(posts_prime);
      }
    })
    .catch(error => {
      console.error(error);
    })
  }
}