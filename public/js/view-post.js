//identify DOM elements
const $leaveComment = $('#leave-comment');
const $newComment = $('#new-comment');
const $commentContent = $('#comment-content');
const $createComment = $('#create-comment');

//handler to show comment box
const showCommentBox = () => {
    $newComment.removeClass('d-none');
}

//handler to create a new comment
const createComment = async (event) => {
    console.log($commentContent)
    const content = $commentContent.val();
    const post_id = event.target.dataset.postid;
    if (content.length) {
       await $.post('/api/comments', { content, post_id });
       document.location.replace('/view-post/'+post_id);
    }
};

//attach event handlers
$leaveComment.on('click', showCommentBox);
$createComment.on('click', createComment);