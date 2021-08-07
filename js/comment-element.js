export const createCommentElement = (comment, isNested, parentId = null) => {
  const commentElement = document.createElement('section')

  commentElement.setAttribute('data-comment-id', comment.id)
  commentElement.classList.add('comment')

  if (isNested) commentElement.classList.add('nested')

  if (parentId) {
    commentElement.setAttribute('data-parent-comment-id', parentId)
  }

  commentElement.innerHTML = `
    <main>
      <aside>
        <img alt="user-image" src="${comment.photoUrl}">
        <p class="votes">${comment.votes}</p>
      </aside>
  
      <section class="content">
        <a href="#">${comment.username}</a>
  
        <p class="comment-body">${comment.body}</p>
      </section>
    </main>
  
    <nav>
      <button data-action="up-vote" data-comment-id="${comment.id}">Up Vote</button>
      <button data-action="down-vote" data-comment-id="${comment.id}">Down Vote</button>
      <button data-action="reply" data-comment-id="${comment.id}">Reply</button>
      <button data-action="edit" data-comment-id="${comment.id}">Edit</button>
      <button data-action="share" data-comment-id="${comment.id}">Share</button>
      <button data-action="delete" data-comment-id="${comment.id}">Delete</button>
    </nav>
  
    <form data-comment-id="${comment.id}" data-parent-comment-id="${parentId || ''}" class="hidden">
      <input aria-label="Comment Input" name="comment-message-input" placeholder="Add your reply" required type="text"/>
      <button type="submit">Add Reply</button>
    </form>
`

  return commentElement
}
