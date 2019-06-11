// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
const quotesUrl = "http://localhost:3000/quotes"
const likesUrl = "http://localhost:3000/likes"
const quoteForm = document.querySelector("form")
const quoteContainer = document.querySelector(".container")
const quoteUlTag = document.querySelector('#quote-list')
const blockQuote = document.querySelector('blockquote')

// const delButton =


const quoteCardHTML =(quote) => {
  return`
  <li class='quote-card'>
    <blockquote data-id= ${quote.id} class="blockquote">
      <p data-quote= ${quote.quote} class="mb-0">${quote.quote}</p>
      <footer data-author= ${quote.author}class="blockquote-footer">${quote.author}</footer>
      <br>
      <button data-quote-id = ${quote.id} data-id = ${quote.id} class='btn-success'>Likes: <span id = "like-span">0</span></button>
      <button class='btn-danger'>Delete</button>
    </blockquote>
  </li>
  `}

  const LikeButtonHTML =(like) => {
    return(`<span id = "like-span">0</span>`)
  }

//Load all quotes
fetch(quotesUrl)
.then(res=> res.json())
.then(quotes => {
  quotes.forEach(quote => {
    // console.log(quoteCardHTML(quote))
    quoteUlTag.innerHTML += quoteCardHTML(quote)
  })
})

//On submitting the form
quoteForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let quoteInput = quoteForm.quote.value
  let authorInput = quoteForm.author.value

  fetch(quotesUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application'
    },
    body: JSON.stringify({
      quote: quoteInput,
      author:authorInput
    })
  })
  .then(res => res.json())
  .then(quotes => {
    quoteUlTag.innerHTML += quoteCardHTML(quotes)
  })
})

//Delete a quote
quoteUlTag.addEventListener('click', (e) => {
  e.preventDefault()
  if(e.target.classList.contains("btn-danger")) {
    e.target.parentElement.remove()
  }
  else if(e.target.classList.contains("btn-success")) {
    const likeButtonSpan = document.querySelector("button.btn-success")
    let quoteId = e.target.dataset.quoteId
    let likeId = e.target.dataset.id
    // console.log(`${likeId}`)
    // let likeId = e.

    //Create like
  //   fetch(`http://localhost:3000/likes/1`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       quoteId: `${likeId}`
  //     })
  //   })
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data)
  //   })
  // }

  fetch(`http://localhost:3000/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({quoteId: `${quoteId}`})
      })
  .then(res => res.json())
  .then(quotes => JSON.stringify(quotes.likes))

    // like.innerHTML += quoteCardHTML(quotes)
  // })
}
})
