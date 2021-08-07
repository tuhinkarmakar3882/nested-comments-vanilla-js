import {handleButtonEvent} from "./button-events";
import {handleFormEvent} from "./form-events";
import {createCommentElement} from "./comment-element";

const comments = {}

const discussionForm = document.querySelector('#join-the-discussion-form')
const commentMessageInput = document.querySelector('#comment-message-input')
const commentsContainer = document.querySelector('.comments-container')

const isNotValid = commentMessage => commentMessage.length < 1 || commentMessage.length > 200;

commentMessageInput.addEventListener('input', () => {
  commentMessageInput.setCustomValidity("");
})

discussionForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const commentMessage = commentMessageInput.value.trim()

  if (isNotValid(commentMessage)) {
    commentMessageInput.setCustomValidity("Comment Message Should be between 1 - 200 Characters long");
    return
  }

  commentMessageInput.setCustomValidity("");
  commentMessageInput.value = "";

  const newComment = {
    id: Date.now(),
    username: 'Alice Bob',
    photoUrl: 'https://picsum.photos/64',
    body: commentMessage,
    votes: 0,
    timestamp: Date.now(),
    replies: []
  }
  comments[newComment.id] = newComment

  const commentElement = createCommentElement(newComment)
  commentsContainer.appendChild(commentElement)
})

commentsContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    handleButtonEvent(e, comments)
  }
})
commentsContainer.addEventListener('submit', (e) => {
  if (e.target.tagName === 'FORM') {
    handleFormEvent(e, comments)
  }
})

for (const key in comments) {
  const comment = comments[key]
  const commentElement = createCommentElement(comment)
  commentsContainer.appendChild(commentElement)

  for (const reply of comment.replies) {
    const replyElement = createCommentElement(reply, true, comment.id)
    commentsContainer.appendChild(replyElement)
  }
}
