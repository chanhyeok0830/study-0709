$(document).ready(function(){
  postLoad();
});

function postLoad(){
  $('#tbdy').empty(); // 기존 테이블 내용을 비움

  // 게시글 목록을 최신 순으로 정렬
  postList.sort(function(a, b) {
    return b.now - a.now;
  });


  postList.forEach(function(post, index) {
    const author = userList[post.author];
    let html = `
    <tr>
      <td>${post.title}</td>
      <td>${author.name}</td>
      <td>${dateFormat(post.now)}</td>
      <td>
        <button onclick="viewPost(${index})" class="btn btn-info">내용 확인</button>
        <button onclick="editPost(${index})" class="btn btn-primary">수정</button>
        <button onclick="deletePost(${index})" class="btn btn-danger">삭제</button>
      </td>
    </tr>`;
    $('#tbdy').append(html);
  });
}

function viewPost(index) {
  location.href = `view.html?idx=${index}`; // 게시물 상세 페이지로 이동
}

function deletePost(index) {
  if(confirm('이 게시물을 삭제하시겠습니까?')) {
    postList.splice(index, 1); // 해당 인덱스의 게시물을 제거.
    localStorage.setItem('postList', JSON.stringify(postList)); // 변경사항을 로컬 스토리지에 저장.
    postLoad(); // 변경된 목록을 다시 로드합니다.
  }
}

function editPost(index) {
  location.href = `post.html?edit=true&index=${index}`; // 수정 페이지로 리다이렉트
}
