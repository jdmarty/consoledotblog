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
    //update DOM elements
    $banner.text('Update this Post');
    $title.val(postData.title);
    $content.val(postData.content);
    $createButton.hide();
    $updateButton.removeClass('d-none');
    $cancelButton.removeClass('d-none');
}

//handler for delete button on posts
const deletePostHandler = async (event) => {
    
}

//handler for post button
const createPost = async (event) => {
    event.preventDefault();
    //identify data for post body
    const title = $title.val().trim();
    const content = $content.val().trim();
    const user_id = $createButton.attr('data-userId');
    //create a post request if all data is present
    if (title.length && content.length) {
        const body = { title, content, user_id };
        const newPostData = await $.post('/api/posts', body);
        console.log(newPostData)
        //navigate back to the dashboard
        document.location.replace('/dashboard');
    }
}


//attach event listeners
$createButton.on('click', createPost);
$('.edit-post-button').on('click', editPostHandler);