$(document).ready(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const postIndex = urlParams.get('idx');
  
  if (postIndex !== null) {
    const post = postList[postIndex];
    $('#title').text(post.title);
    $('#author').text(userList[post.author].name);
    $('#date').text(dateFormat(post.now));
    $('#content').html(post.content);
  }
});
