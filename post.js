$(document).ready(function() {
  if (!user) {
      location.href = 'login.html';
      return;
  }

  const name = user.name;
  $('#author').val(name);

  Jodit.make('#content');

  // URL에서 idx 파라미터 확인
  const urlParams = new URLSearchParams(window.location.search);
  const postIndex = urlParams.get('idx');

  if (postIndex !== null) {
      // 수정 모드: 기존 글 불러오기
      const post = postList[postIndex];
      $('#title').val(post.title);
      $('#content').val(post.content);
      $('button').text('수정');
  }
});

function save() {
  const title = $('#title').val();
  const author = user.id;
  const content = $('#content').val();
  const now = new Date().getTime();

  const urlParams = new URLSearchParams(window.location.search);
  const postIndex = urlParams.get('idx');

  if (postIndex !== null) {
      // 수정 모드
      postList[postIndex] = {
          'title': title,
          'author': author,
          'content': content,
          'now': now,
      };
      alert('글이 수정되었습니다.');
  } else {
      // 새 글 작성 모드
      const newPost = {
          'title': title,
          'author': author,
          'content': content,
          'now': now,
      };
      postList.push(newPost);
      alert('글이 발행되었습니다.');
  }

  localStorage.setItem('postList', JSON.stringify(postList));
  location.href = 'index.html';
}
