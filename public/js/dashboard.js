//identify DOM elements
const $banner = $('#banner');
const $title = $('#title');
const $content = $('#content');
const $createButton = $('#create-post-button');
const $updateButton = $('#update-post-button');
const $cancelButton = $('#cancel-update-button');

//handler for edit button on posts
const editPostHandler = async (event) => {
    //retrieve data for this post
    const apiUrl = '/api/posts/'+event.target.dataset.postid
    const postData = await $.get(apiUrl);
    console.log(postData)
    //update DOM elements
    $banner.text('Update this Post');
    $title.val(postData.title);
    $content.val(postData.content);
    $createButton.hide();
    $updateButton.removeClass('d-none');
    $cancelButton.removeClass('d-none');
}

//handler for post button
const createPost = async (event) => {
    
}

$('.edit-post-button').on('click', editPostHandler)