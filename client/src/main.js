import supabase from '../superbaseCli.js'
console.log(supabase)



const app = document.getElementById('app')

async function fetchData() {
  const res = await fetch(`http://localhost:5173/jokes`)
  const jokes = await res.json()

  displayJokes(jokes)
}

function displayJokes(param) {
  // clear the div before we add things 
  app.innerHTML = ''
  param.forEach(singleJoke => {
    const h3 = document.createElement('h3')
    const pTag = document.createElement('p')
    const div = document.createElement('div')
    const deleteButton = document.createElement('button')

    h3.innerText = singleJoke.joke
    pTag.innerText = singleJoke.punchline
    deleteButton.innerText = 'X'

    deleteButton.addEventListener('click', function() {
      handleDelete(singleJoke.id)
    })

    div.appendChild(deleteButton)
    div.appendChild(h3)
    div.appendChild(pTag)

    app.appendChild(div)
  })
}

fetchData()

async function handleDelete(id) {
  const res = await fetch(`http://localhost:5173/jokes/${id}`, {
    method: 'DELETE'
  })
  if (res.ok) {
    fetchData()
  }
}

const submitBtn = document.querySelector('.submit__btn')
const userName = document.querySelector('#user')
const comment = document.querySelector('#comment')
const commentsCont = document.querySelector('.comments__container')

submitBtn.addEventListener('click', submitFeedback)

function submitFeedback(e){
    // get user name
    const userForm = userName.value 
    // get feedback
    const commentForm = comment.value 
    // if inputs are not empty
    if(userForm && commentForm !== ''){
        // create new feedback
        newFeedback = {
            "id": Math.floor((Math.random() * 1000)+ 1),
            "userName": userForm,
            "userComment": commentForm,
            "typeOfFeedback": positiveFeedback
        }
        // add new feedback to array
        feedbackArr.push(newFeedback)
        // if liked add to count
        if(positiveFeedback === true){
            addLikes()
        }
        // clear inputs 
        resetForm()
        // add feedback to list
        addFeedback(newFeedback)
    }


    e.preventDefault()
}



function resetForm(){
    userName.value = ''
    comment.value = ''
    likeIcon.innerHTML = `<i class="far fa-heart"></i>`
    positiveFeedback = false
}

function addFeedback(item){
    // select first letter of the user name
    const letter = (item.userName).charAt(0)
    // create new div
    const div = document.createElement('div')
    // add class
    div.classList = 'comment__card'
    // add id
    div.id = item.id 
    // add html
    div.innerHTML = `
    <div class="pic center__display">
                    ${letter}
                </div>
                <div class="comment__info">
                    <small class="nickname">
                        ${item.userName}
                    </small>
                    <p class="comment">
                        ${item.userComment}
                    </p>
                    <div class="comment__bottom">
                        <div class="heart__icon--comment">
                            ${item.typeOfFeedback ? `<i class="fas fa-heart positive"></i>` : `<i class="far fa-heart"></i>`}
                        </div>
                        <button>
                            Reply
                        </button>
                    </div>
                </div>
    `
    // insert feedback into the list
    commentsCont.insertAdjacentElement('beforeend', div)
}