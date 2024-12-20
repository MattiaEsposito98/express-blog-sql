const posts = require('../data/posts')
const { validate, converter, converterForDestroy } = require('../data/utilities')
let lastIndex = posts.at(-1).id


//index 
function index(req, res) {
  const title = posts.map((post) => post.title)
  console.log(`Elenco dolci: ${title}`)

  let filteredPosts = posts
  const tag = req.query.tags

  if (tag) {
    filteredPosts = posts.filter((post) => {
      return post.tags.includes(tag)
    })

  }

  res.json({
    results: filteredPosts
  })
  const tagPost = filteredPosts.map((tag) => tag.title)
  console.log(`Dolci con tag ${tag}: ${tagPost}`)
}


//show
function show(req, res) {
  let identifier = req.params.identifier
  console.log(`Parametro dinamico: ${identifier}`)
  //Funzione per convertire identifier
  const post = converter(identifier, posts)

  if (!post) {
    return errorsHandler(err, req, res, next)
  }
  res.json(post)

}


//Store
function store(req, res) {
  console.log(req.body)
  const { title, slug, content, image, tags, published } = req.body
  const errors = validate(req)


  if (errors.length) {
    res.status(400)

    return res.json({
      error: 'Invalid request',
      messages: errors,
    })
  }
  lastIndex++

  const post = {
    id: lastIndex,
    title,
    slug,
    content,
    image,
    tags,
    published
  }

  posts.push(post)

  res.status(201).json(post)
}



// Update per tutti i campi
function update(req, res) {
  let identifier = req.params.identifier
  console.log(`Parametro dinamico per modifica: ${identifier}`)

  //Funzione per convertire identifier
  const post = converter(identifier, posts)

  const errors = validate(req)

  if (errors.length) {
    res.status(400)

    return res.json({
      error: 'Invalid request',
      messages: errors,
    })
  }
  console.log(`Aggiorno dolce: ${identifier}`)


  const { title, slug, content, image, tags } = req.body
  post.title = title
  post.slug = slug
  post.content = content
  post.image = image
  post.tags = tags


  if (!post) {
    return errorsHandler(err, req, res, next)
  }
  res.json(post)
}



// modify per campi parziali
function modify(req, res) {
  let identifier = req.params.identifier
  console.log(`Parametro dinamico per modifica: ${identifier}`)
  //Funzione per convertire identifier
  const post = converter(identifier, posts)

  console.log(`Modifico dolce: ${identifier}`)

  const { title, slug, content, image, tags } = req.body
  if (title) post.title = title
  if (slug) post.slug = slug
  if (content) post.content = content
  if (image) post.image = image
  if (tags) post.tags = tags

  if (!post) {
    return errorsHandler(err, req, res, next)
  }
  res.json(post)
}



// destroy
function destroy(req, res) {
  let identifier = req.params.identifier
  console.log(`Elimino dolce: ${identifier}`)
  //Funzione per convertire identif
  const postIndex = converterForDestroy(identifier, posts)

  if (postIndex === -1) {
    return errorsHandler(err, req, res, next)
  }

  posts.splice(postIndex, 1)

  res.sendStatus(204)
  console.log(`${identifier} eliminato`)
  const remainingSweet = posts.map((post) => post.title)
  console.log(`Elenco dolci rimasti: ${remainingSweet}`)
}

module.exports = { index, show, store, update, modify, destroy }


