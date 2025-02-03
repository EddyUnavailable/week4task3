import supabase from '../superbaseCli.js'
console.log(supabase)



// console.log('Hello')
// async function fetchData() {
//     const unicorns = await fetch(`https://jsonplaceholder.typicode.com/posts`) 
//     const flowers = await unicorns.json()
//     generateUI(flowers)
// }
// fetchData()
// function generateUI(dataToRender) {
  
//     for (let i = 0; i < dataToRender.length; i++) {
//         // 1. create the element(s) (the ptag) we want
//         const containerElem = document.createElement('div')
//         const titleElem = document.createElement('h2')
//         const pElem = document.createElement('p')
//         // 2. Put the info we need in them.
//         titleElem.innerText = dataToRender[i].title
//         pElem.innerText = dataToRender[i].body
//         containerElem.setAttribute('class', 'post')
//         // 3. append the title and ptag to the container we made
//         containerElem.appendChild(titleElem)
//         containerElem.appendChild(pElem)
//         const contentDiv = document.getElementById('content')
//         contentDiv.appendChild(containerElem)
//     }
//     dataToRender.forEach((post) => {
//            // 1. create the element(s) (the ptag) we want
//            const containerElem = document.createElement('div')
//            const titleElem = document.createElement('h2')
//            const pElem = document.createElement('p')
   
//            // 2. Put the info we need in them.
//            titleElem.innerText = post.title
//            pElem.innerText = post.body
   
//            containerElem.setAttribute('class', 'coolerPost')
   
//            // 3. append the title and ptag to the container we made
//            containerElem.appendChild(titleElem)
//            containerElem.appendChild(pElem)
   
//            const contentDiv = document.getElementById('content')
//            contentDiv.appendChild(containerElem)
//     })
// }

// const form = document.getElementById('form');

// form.addEventListener('submit', function(e) {
//     // Prevent default behavior:
//     e.preventDefault();
//     // Create new FormData object:
//     const formData = new FormData(form);
//     // Convert formData object to URL-encoded string:
//     const payload = new URLSearchParams(formData);
//     // Post the payload using Fetch:
//     fetch('https://httpbin.org/post', {
//     method: 'POST',
//     body: payload,
//     })
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(err => console.log(er))
// })

const submitBtn = document.querySelector('.submit__btn')
const userName = document.querySelector('#user')
const comment = document.querySelector('#comment')
const likeIcon = document.querySelector('.heart__icon')
const count = document.querySelector('.count')
const commentsCont = document.querySelector('.comments__container')

likeIcon.addEventListener('click', likeVideo)
submitBtn.addEventListener('click', submitFeedback)


feedbackArr = []
let positiveFeedback = false
let likesCount = 0

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

function likeVideo(){
    likeIcon.classList.toggle('liked')

    if(likeIcon.classList.contains('liked')){
        likeIcon.innerHTML = `<i class="fas fa-heart"></i>`
        // set feedback to liked
        positiveFeedback = true
    } else {
        likeIcon.innerHTML = `<i class="far fa-heart"></i>`
        // set feedback to not liked
        positiveFeedback = false
    }
}

function addLikes(){
    likesCount++
    count.innerHTML = likesCount
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