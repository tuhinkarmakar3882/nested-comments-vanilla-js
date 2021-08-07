import {createCommentElement} from "./comment-element";

export const handleFormEvent = (evt, comments) => {
  evt.preventDefault()

  const dataCommentId = evt.target.getAttribute("data-comment-id")
  const inputElement = document.querySelector(`form[data-comment-id="${dataCommentId}"] input`)

  if (inputElement.value.trim().length === 0) return

  const newComment = {
    id: Date.now(),
    username: 'Alice Bob',
    photoUrl: 'https://picsum.photos/64',
    body: inputElement.value.trim(),
    votes: 0,
    timestamp: Date.now(),
    replies: []
  }
  inputElement.value = ''

  const dataParentCommentId = evt.target.getAttribute("data-parent-comment-id") || dataCommentId

  const commentElement = createCommentElement(newComment, true, dataParentCommentId)

  const parentComment = document.querySelector(`section[data-comment-id="${dataParentCommentId}"]`)
  parentComment.append(commentElement)

  comments[dataParentCommentId].replies.push(newComment)
  console.log(comments)
};
