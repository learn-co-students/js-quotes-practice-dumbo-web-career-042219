// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.

quotesULTag = document.querySelector("#quote-list")
createForm = document.querySelector("#new-quote-form")

fetch('http://localhost:3000/quotes')
.then(resp => resp.json())
.then(quotes => {
  quotes.forEach((quote) => {
    quotesULTag.innerHTML += createQuoteLi(quote)
  })
})

fetch('http://localhost:3000/likes')
.then(resp => resp.json())
.then(like => {
  like.forEach((like) =>
  quotesULTag
)
})

const createQuoteLi = (quote) => {
  return `<li data-id=${quote.id} class='quote-card'>
  <blockquote class="blockquote">
    <p class="mb-0">${quote.quote}</p>
    <footer class="blockquote-footer">${quote.author}</footer>
    <br>
    <button class='btn-success' data-likes=${quote.likes}>Likes: <span>${quote.likes}</span></button>
    <button class='btn-danger'>Delete</button>
  </blockquote>
</li>`
}



createForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submission = event.target
  author = submission.author.value
  quote = submission.quote.value
  fetch('http://localhost:3000/quotes', {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      author: author,
      quote: quote,
      likes: 0
    })
  }).then(resp => resp.json())
  .then(newQuote => {
    quotesULTag.innerHTML += createQuoteLi(newQuote)
  })
})



quotesULTag.addEventListener("click", (event) => {
target = event.target
targetID = target.parentElement.parentElement.dataset.id
if (target.classList.contains("btn-danger")) {
  fetch(`http://localhost:3000/quotes/${targetID}`, {
    method: "Delete"
  }).then( target.parentElement.parentElement.remove())
} else if (target.classList.contains("btn-success")) {
    const  newLikes = parseInt(target.dataset.likes) + 1
      fetch(`http://localhost:3000/quotes/${targetID}`, {
        method: "PATCH",
        headers: {
          'Content-type': "application/json",
          'Accept': "application/json"
        },
        body: JSON.stringify({
          likes: newLikes
        })
      }).then(resp => resp.json())
        .then(likeUpdate => {
        target.dataset.likes = likeUpdate.likes
        target.innerText = `Likes: ${likeUpdate.likes}`
      })

  fetch('http://localhost:3000/likes',{
    method: "POST",
    headers:{
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      quoteId: targetID,
      createdAt: Date.now()
    })
  })
}






})
