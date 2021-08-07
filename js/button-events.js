function incrementVotes(e) {
  const dataCommentId = e.target.getAttribute("data-comment-id")
  const voteElement = document.querySelector(`section[data-comment-id="${dataCommentId}"] p.votes`)
  voteElement.textContent = (parseInt(voteElement.textContent) + 1).toString()
}

function decrementVotes(e) {
  const dataCommentId = e.target.getAttribute("data-comment-id")
  const voteElement = document.querySelector(`section[data-comment-id="${dataCommentId}"] p.votes`)
  const voteValue = parseInt(voteElement.textContent)
  voteElement.textContent = voteValue === 0 ? "0" : voteValue - 1
}

function deleteComment(e) {
  const dataCommentId = e.target.getAttribute("data-comment-id")

  const commentElement = document.querySelector(`section[data-comment-id="${dataCommentId}"]`)
  const parentCommentId = commentElement.getAttribute('data-parent-comment-id')

  if (parentCommentId) {
    const commentsContainer = document.querySelector(`section[data-comment-id="${parentCommentId}"]`)
    commentsContainer.removeChild(commentElement)
  } else {
    const commentsContainer = document.querySelector('main.comments-container')
    commentsContainer.removeChild(commentElement)
  }
}

function toggleReplyBox(e) {
  const dataCommentId = e.target.getAttribute("data-comment-id")
  const formElement = document.querySelector(`section[data-comment-id="${dataCommentId}"] form`)

  if (formElement.getAttribute("data-form-visible")) {
    formElement.classList.add('hidden')
    formElement.setAttribute("data-form-visible", "")
  } else {
    formElement.classList.remove('hidden')
    formElement.setAttribute("data-form-visible", "true")
  }
}

export const handleButtonEvent = e => {
  const buttonAction = e.target.getAttribute("data-action")

  switch (buttonAction) {
    case 'up-vote':
      incrementVotes(e)
      break

    case 'down-vote':
      decrementVotes(e)
      break

    case 'reply':
      toggleReplyBox(e)
      break

    case 'share':
      console.log('share')
      break

    case 'delete':
      deleteComment(e)
      break

    case 'edit':
      console.log('edit')
      break
  }
};
