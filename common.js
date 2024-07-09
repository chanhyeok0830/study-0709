const user = JSON.parse(sessionStorage.getItem('user'));

let postList = [];
if( localStorage.getItem('postList') ){
  postList = JSON.parse(
    localStorage.getItem('postList')
  );
}

let userList = [];
if( localStorage.getItem('userList') ){
  userList = JSON.parse(
    localStorage.getItem('userList')
  );
}

function dateFormat(now){
const date = new Date(now);

const year = date.getFullYear().toString();
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const day = date.getDate().toString().padStart(2, '0');

const hour = date.getHours().toString().padStart(2, '0');
const min = date.getMinutes().toString().padStart(2, '0');
const sec = date.getSeconds().toString().padStart(2, '0');

return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}

function validationRegist(id, callback) {
  $('#' + id).on('keydown', function (e) {
    setTimeout(function () {
      var val = $('#' + id).val();
      var ret = callback(val);
      if (ret) {
        $('#' + id).removeClass("is-valid");
        $('#' + id).addClass("is-invalid");
        $('#' + id).siblings(".invalid-feedback").text(ret);
      } else {
        $('#' + id).removeClass("is-invalid");
        $('#' + id).addClass("is-valid");
        $('#' + id).siblings(".valid-feedback").text('유효합니다.');
      }
    }, 10);
  });
}

function logout(){
  sessionStorage.removeItem('user');
  location.href = 'login.html';
}