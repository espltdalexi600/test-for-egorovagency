const form = document.querySelector('.form')
const postFormURL = '/email'

const popup = document.querySelector('.popup')
const popupTitle = document.querySelector('.popup__title')
const popupBody = document.querySelector('.popup__body')
const popupButton = document.querySelector('.popup__button')
const popupCross = document.querySelector('.popup__cross')

popupButton.addEventListener('click', closePopup)

popupCross.addEventListener('click', closePopup)

form.addEventListener('submit', (event) => {
  event.preventDefault()
  if (checkEmail(form.email.value)) {
    sendForm(form)
    form.email.value = ''
    form.email.blur()
  } else {
    showMessage(form.email, 'Invalid email! Change it and try again.')
    form.email.focus()
  }
})

function checkEmail(str) {
  const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return emailRegExp.test(str)
}

async function sendForm(form) {
  let formData = new FormData(form)
  try {
    let response = await fetch(postFormURL, {
      method: 'POST',
      body: formData,
    })
    if (response.ok) {
      showPopup(
        'Succes!',
        'You have successfully subscribed to the email newsletter',
      )
    } else if (response.status >= 400 && response.status < 500) {
      let message = await response.text()
      console.log(message)
      showPopup('Error!', message)
    } else {
      let message = await response.text()
      console.log(message)
      showPopup('Error!', 'Server error.')
    }
  } catch (error) {
    console.log(error)
  }
}

function showPopup(title, body) {
  popupTitle.textContent = title
  popupBody.textContent = body
  popup.classList.add('popup--show')
  popup.firstElementChild.classList.add('popup__wrapper--show')
}

function closePopup() {
  popup.classList.remove('popup--show')
  popup.firstElementChild.classList.remove('popup__wrapper--show')
}

function showMessage(target, message) {
  if (!message) return
  target.classList.add('red-text')

  let messageElem = document.createElement('div')
  messageElem.className = 'message'
  messageElem.innerHTML = message
  document.body.append(messageElem)

  let coords = target.getBoundingClientRect()

  let left =
    coords.left +
    window.pageXOffset +
    (target.offsetWidth - messageElem.offsetWidth) / 2
  if (left < 0) left = 0

  let top = coords.top + window.pageYOffset - messageElem.offsetHeight - 5
  if (top < window.pageYOffset) {
    top = coords.top + window.pageYOffset + target.offsetHeight + 5
  }

  messageElem.style.left = left + 'px'
  messageElem.style.top = top + 'px'
  messageElem.classList.add('message--show')

  setTimeout(() => {
    messageElem.classList.remove('message--show')
  }, 1700)
  setTimeout(removeMessage, 2000, target, messageElem)
}

function removeMessage(target, messageElem) {
  if (messageElem) {
    messageElem.remove()
    messageElem = null
  }
  target.classList.remove('red-text')
}
