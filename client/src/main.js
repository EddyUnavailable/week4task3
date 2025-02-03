import supabase from '../superbaseCli.js'
console.log(supabase)



console.log('Hello')
async function fetchData() {
    const unicorns = await fetch(`https://jsonplaceholder.typicode.com/posts`) 
    const flowers = await unicorns.json()
    generateUI(flowers)
}
fetchData()
function generateUI(dataToRender) {
  
    for (let i = 0; i < dataToRender.length; i++) {
        // 1. create the element(s) (the ptag) we want
        const containerElem = document.createElement('div')
        const titleElem = document.createElement('h2')
        const pElem = document.createElement('p')
        // 2. Put the info we need in them.
        titleElem.innerText = dataToRender[i].title
        pElem.innerText = dataToRender[i].body
        containerElem.setAttribute('class', 'post')
        // 3. append the title and ptag to the container we made
        containerElem.appendChild(titleElem)
        containerElem.appendChild(pElem)
        const contentDiv = document.getElementById('content')
        contentDiv.appendChild(containerElem)
    }
    dataToRender.forEach((post) => {
           // 1. create the element(s) (the ptag) we want
           const containerElem = document.createElement('div')
           const titleElem = document.createElement('h2')
           const pElem = document.createElement('p')
   
           // 2. Put the info we need in them.
           titleElem.innerText = post.title
           pElem.innerText = post.body
   
           containerElem.setAttribute('class', 'coolerPost')
   
           // 3. append the title and ptag to the container we made
           containerElem.appendChild(titleElem)
           containerElem.appendChild(pElem)
   
           const contentDiv = document.getElementById('content')
           contentDiv.appendChild(containerElem)
    })
}

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

