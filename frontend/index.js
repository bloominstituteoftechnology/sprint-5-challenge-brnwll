async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const api = {
    learners: 'http://localhost:3003/api/learners',
    mentors: 'http://localhost:3003/api/mentors'
  }

  // Target element for our learner cards
  let rootEl = document.querySelector('section div.cards')

  Promise.all([axios.get(api.learners), axios.get(api.mentors)])
    .then(res => {
      let [learners, mentors] = [res[0].data, res[1].data]
      validate(learners, mentors)
      learners.forEach(learner => {
        learner.mentors = learner.mentors.map(id => {
          let mentor = mentors.find(mentor => mentor.id === id)
          return `${mentor.firstName} ${mentor.lastName}`
        })
        rootEl.appendChild(createCardFor(learner))
      })
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
    return cardDiv
  }

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
