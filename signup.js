function validationRegist(id, callback) {
  $('#' + id).on('input', function (e) {
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

validationRegist('name', function (val) {
  if (val.length < 2) {
    return '이름을 2자 이상 입력해 주세요.';
  }
});

validationRegist('id', function (val) {
  var id_exptext = /^[A-Za-z0-9]+$/;
  if (val.length < 4) {
    return '아이디를 4자 이상 입력하시오.';
  } else if (!id_exptext.test(val)) {
    return '아이디는 영문자와 숫자만 가능합니다.';
  } else if (!/^[A-Za-z]/.test(val.charAt(0))) {
    return '아이디는 영문자로 시작해야 합니다.';
  }
  if (userList[val]) {
    return '중복된 아이디가 존재합니다.';
  }
  return '';
});

validationRegist('pw', function (val) {
  var pw_exptext = /^[A-Za-z0-9\#]+$/;
  if (val.length < 8) {
    return '비밀번호를 8자 이상 입력하시오.';
  } else if (!pw_exptext.test(val)) {
    return '비밀번호는 영문자, 숫자, #만 가능합니다.';
  } else if (val.indexOf('#') == -1) {
    return '비밀번호에 #을 포함시켜 주세요.';
  }
});

validationRegist('pw2', function (val) {
  if (val != $('#pw').val()) {
    return '입력한 비밀번호와 다릅니다.';
  }
});

validationRegist('email', function (val) {
  var email_exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  if (!email_exptext.test(val)) {
    return '이메일 형식에 맞게 입력하시오.';
  }
});

$('#name').on('keydown', function (evt) {
  if (evt.code === 'Enter') {
    if ($(this).hasClass('is-valid')) {
      $(this).parent('.input-box').removeClass('show');
      $('#id').parent('.input-box').addClass('show');
    }
  }
});
$('#id').on('keydown', function (evt) {
  if (evt.code === 'Enter') {
    if ($(this).hasClass('is-valid')) {
      $(this).parent('.input-box').removeClass('show');
      $('#pw').closest('.input-box').addClass('show');
    }
  }
});
$('#pw2').on('keydown', function (evt) {
  if (evt.code === 'Enter') {
    if ($(this).hasClass('is-valid')) {
      $('#pw').closest('.input-box').removeClass('show');
      $(this).closest('.input-box').removeClass('show');
      $('#email').parent('.input-box').addClass('show');
    }
  }
});
$('#email').on('keydown', function (evt) {
  if (evt.code === 'Enter') {
    if ($(this).hasClass('is-valid')) {
      $(this).parent('.input-box').removeClass('show');
      $('#btn').parent('.input-box').addClass('show');
    }
  }
});

var boxList = $('.input-box');
function showBox(box){
  $(box).removeClass('d-none');
  setTimeout(function(){
    $(box).addClass('show');
    $(box).find('input').first().focus();
  }, 500);
}

function hideBox(box){
  $(box).removeClass('show');
  setTimeout(function(){
    $(box).addClass('d-none');
  }, 500);
}

function registEvt(box, next){
  var input = $(box).find('input').last();
  $(input).on('keydown', function(evt){
    if(evt.code === 'Enter'){
      if($(input).hasClass('is-valid')){
        hideBox(box);
        showBox(next);
      }
    }
  });
}

for(let i = 0; i < boxList.length - 1; i++){
  var box = boxList[i];
  var next = boxList[i + 1];
  registEvt(box, next);
  if(i === 0){
    showBox(box);
  }
}

function signup(){
  const inputs = $('.input-box input');
  const user = {};
  for ( let i = 0; i < inputs.length; i++ ){
    const key = $(inputs[i]).attr('id');
    const value = $(inputs[i]).val();
    if( key === undefined ){
      continue;
    }
    user[key] = value;
  }

  let userList = {};

  if( localStorage.getItem('userList') ){
    userList = JSON.parse(
      localStorage.getItem('userList')
    );
  }

  if ( userList[user.id] ){
    alert('이미 존재하는 아이디입니다.');
    location.reload();
    return;
  }

  userList[user.id] = user;

  localStorage.setItem('userList', JSON.stringify(userList));
  alert('회원가입이 완료되었습니다.');
  location.href = 'login.html';
}
