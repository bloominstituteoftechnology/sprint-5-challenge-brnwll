async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const api = {
    learners: 'http://localhost:3003/api/learners',
    mentors: 'http://localhost:3003/api/mentors'
  }

  // Holders for API data
  let learners
  let mentors

  // Fetch data, validate, build and append cards
  const rootEl = document.querySelector('section div.cards')
  Promise.all([axios.get(api.learners), axios.get(api.mentors)])
    .then(res => {
      learners = res[0].data
      mentors = res[1].data
      validate(learners, mentors)
      learners.forEach(learner => {
        learner.mentors = learner.mentors.map(id => {
          let mentor = mentors.find(mentor => mentor.id === id)
          return `${mentor.firstName} ${mentor.lastName}`
        })
        rootEl.appendChild(createCardFor(learner))
      })
      updateInfoP()
    })
    .catch(err => {
      console.error(err)
    })

  // each of the api objects should contain a 'data' key that is an Array
  // Invalid url returns a string.
  function validate(...apiCallData) {
    apiCallData.forEach(data => {
      if (typeof data === 'string') {
        throw new Error('Invalid data. Check endpoint.')
      }
    })
  }

  function createCardFor(learner) {
    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card')
    const nameH3 = document.createElement('h3')
    nameH3.textContent = learner.fullName
    const emailDiv = document.createElement('div')
    emailDiv.textContent = learner.email
    const openCloseH4 = document.createElement('h4')
    openCloseH4.textContent = 'Mentors'
    openCloseH4.classList.add('closed')
    openCloseH4.addEventListener('click', handleMentorListClick)
    const mentorUl = document.createElement('ul')
    learner.mentors.forEach(mentor => {
      const mentorLi = document.createElement('li')
      mentorLi.textContent = mentor
      mentorUl.appendChild(mentorLi)
    })
    cardDiv.appendChild(nameH3)
    cardDiv.appendChild(emailDiv)
    cardDiv.appendChild(openCloseH4)
    cardDiv.appendChild(mentorUl)
    cardDiv.addEventListener('click', handleLearnerCardClick)
    return cardDiv
  }

  function handleLearnerCardClick(e) {
    if (!e.currentTarget.classList.contains('selected')) {
      // user clicked a card that is not selected
      deselectAllCards()
      e.currentTarget.classList.add('selected')
      updateInfoP(`The selected learner is ${e.currentTarget.firstChild.textContent}`)
      const h3 = e.currentTarget.querySelector('h3')
      const learner = learners.find(learner => learner.fullName === h3.textContent)
      updateCardName(h3, learner.id)
    } else {
      // user clicked a selected card
      e.currentTarget.classList.remove('selected')
      updateInfoP()
      updateCardName(e.currentTarget.querySelector('h3'))
    }
  }

  function handleMentorListClick(e) {
    e.target.classList.toggle('open')
    e.target.classList.toggle('closed')
    if (e.target.parentElement.classList.contains('selected')) {
      // we don't want clicking the mentor list on a selected card to close the card
      e.stopPropagation()
    }
  }

  function updateInfoP(text = 'No learner is selected') {
    const p = document.querySelector('p.info')
    p.textContent = text
  }

  function updateCardName(h3, id = null) {
    h3.textContent = id
      ? `${h3.textContent}, ID ${id}`
      : h3.textContent.split(', ID ')[0]
  }

  function deselectAllCards() {
    document.querySelectorAll('.card').forEach(card => {
      card.classList.remove('selected')
      updateCardName(card.firstChild)
    })
    updateInfoP()
  }

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
