// const posts = require('../data/posts')
const { validate, converter, converterForDestroy } = require('../data/utilities')
// let lastIndex = posts.at(-1).id
const connection = require('../data/db')


//index 
function index(req, res) {
  const sql = 'SELECT * FROM db_posts.posts'

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query failed' })
    res.json(results)
  })
}


//show
function show(req, res) {
  const id = req.params.identifier

  const sql = `SELECT * FROM db_posts.posts	WHERE id = ?`

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query failed' })
    if (results.length === 0) return res.status(404).json({ error: 'Post not found' })
    res.json(results[0])
  })
}


// //Store
// function store(req, res) {
//   console.log(req.body)
//   const { title, slug, content, image, tags, published } = req.body
//   const errors = validate(req)


//   if (errors.length) {
//     res.status(400)

//     return res.json({
//       error: 'Invalid request',
//       messages: errors,
//     })
//   }
//   lastIndex++

//   const post = {
//     id: lastIndex,
//     title,
//     slug,
//     content,
//     image,
//     tags,
//     published
//   }

//   posts.push(post)

//   res.status(201).json(post)
// }



// // Update per tutti i campi
// function update(req, res) {
//   let identifier = req.params.identifier
//   console.log(`Parametro dinamico per modifica: ${identifier}`)

//   //Funzione per convertire identifier
//   const post = converter(identifier, posts)

//   const errors = validate(req)

//   if (errors.length) {
//     res.status(400)

//     return res.json({
//       error: 'Invalid request',
//       messages: errors,
//     })
//   }
//   console.log(`Aggiorno dolce: ${identifier}`)


//   const { title, slug, content, image, tags } = req.body
//   post.title = title
//   post.slug = slug
//   post.content = content
//   post.image = image
//   post.tags = tags


//   if (!post) {
//     return errorsHandler(err, req, res, next)
//   }
//   res.json(post)
// }



// // modify per campi parziali
// function modify(req, res) {
//   let identifier = req.params.identifier
//   console.log(`Parametro dinamico per modifica: ${identifier}`)
//   //Funzione per convertire identifier
//   const post = converter(identifier, posts)

//   console.log(`Modifico dolce: ${identifier}`)

//   const { title, slug, content, image, tags } = req.body
//   if (title) post.title = title
//   if (slug) post.slug = slug
//   if (content) post.content = content
//   if (image) post.image = image
//   if (tags) post.tags = tags

//   if (!post) {
//     return errorsHandler(err, req, res, next)
//   }
//   res.json(post)
// }



// // destroy
// function destroy(req, res) {
//   let identifier = req.params.identifier
//   console.log(`Elimino dolce: ${identifier}`)
//   //Funzione per convertire identif
//   const postIndex = converterForDestroy(identifier, posts)

//   if (postIndex === -1) {
//     return errorsHandler(err, req, res, next)
//   }

//   posts.splice(postIndex, 1)

//   res.sendStatus(204)
//   console.log(`${identifier} eliminato`)
//   const remainingSweet = posts.map((post) => post.title)
//   console.log(`Elenco dolci rimasti: ${remainingSweet}`)
// }

module.exports = { index, show }
// show, store, update, modify, destroy }


