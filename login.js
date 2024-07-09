// userList 초기화
let userList = {};
if (localStorage.getItem('userList')) {
  userList = JSON.parse(localStorage.getItem('userList'));
}

function onKeyDown(event) {
  if (event.code === 'Enter') {
    login();
  }
}

$(document).ready(function() {
  $('#password').on('keydown', onKeyDown);
  $('#id').on('keydown', onKeyDown);
});

function login() {
  const id = $('#id').val();
  const password = $('#password').val();

  if (userList && userList[id]) {
    if (userList[id]['pw'] === password) {
      const user = userList[id];
      sessionStorage.setItem('user', JSON.stringify(user));
      location.href = 'index.html';
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  } else {
    alert('회원정보가 존재하지 않습니다.');
  }
}
