//identify DOM elements
const $banner = $('#banner');
const $title = $('#title');
const $content = $('#content');
const $createButton = $('#create-post-button');
const $updateButton = $('#update-post-button');
const $cancelButton = $('#cancel-update-button');

//handler for edit button on posts
const editPostHandler = async (event) => {
  //retrieve data for this post with get request
  const postId = event.target.dataset.postid;
  const apiUrl = '/api/posts/' + postId
  const postData = await $.get(apiUrl);
  //update DOM elements
  $banner.text('Update this Post');
  $title.val(postData.title);
  $content.val(postData.content);
  $createButton.hide();
  $updateButton.removeClass('d-none').attr('data-postId', postId );
  $cancelButton.removeClass('d-none');
};

//handler for delete button on posts
const deletePostHandler = async (event) => {
  //send delete request
  const apiUrl = '/api/posts/' + event.target.dataset.postid;
  await $.ajax(apiUrl, {
    method: 'DELETE',
  });
  //navigate back to the dashboard
  document.location.replace('/dashboard');
};

//handler for post button
const createPost = async (event) => {
  event.preventDefault();
  //identify data for post body
  const title = $title.val().trim();
  const content = $content.val().trim();
  const user_id = $createButton.attr('data-userId');
  //create a post request if all data is present
  if (title.length && content.length) {
    await $.post('/api/posts', { title, content, user_id });
    //navigate back to the dashboard
    document.location.replace('/dashboard');
  }
};

//handler for update button
const updatePost = async (event) => {
  event.preventDefault();
  //create target url
  const postId = event.target.dataset.postid;
  const apiUrl = '/api/posts/' + postId;
  console.log(apiUrl)
  //identify data for put body
  const title = $title.val().trim();
  const content = $content.val().trim();
  //create a put request if all data is present
  if (title.length && content.length) {
    await $.ajax(apiUrl, {
      method: 'PUT',
      data: { title, content },
    });
    //navigate back to the dashboard
    document.location.replace('/dashboard');
  }
};

//handler for cancel button
const cancelUpdate = async (event) => {
  event.preventDefault();
  //navigate back to the dashboard
  document.location.replace('/dashboard');
}

//attach event listeners
$createButton.on('click', createPost);
$updateButton.on('click', updatePost);
$('.edit-post-button').on('click', editPostHandler);
$('.delete-post-button').on('click', deletePostHandler);
