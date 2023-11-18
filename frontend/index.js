async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const api = {
    learners: 'http://localhost:3003/api/learners',
    mentors: 'http://localhost:3003/api/mentors'
  }

  Promise.all([axios.get(api.learners), axios.get(api.mentors)])
    .then(res => {
      res.forEach(apiCallData => validate(apiCallData.data))
      console.log(res)
    })
    .catch(err => {
      console.error(err)
    })

  // each of the api objects should contain a 'data' key that is an Array
  // Invalid url returns a string.
  function validate(apiCallData) {
    if (typeof apiCallData === 'string') {
      throw new Error('Invalid data. Check endpoint.')
    }
  }

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`


  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
