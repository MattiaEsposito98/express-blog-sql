const { validate, converter, converterForDestroy } = require('../data/utilities')
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
  const postsql = `SELECT * FROM db_posts.posts WHERE id = ?`

  const tagsql = `
    SELECT t.* FROM tags AS t 
    JOIN post_tag ON t.id = post_tag.tag_id
    WHERE post_tag.post_id = ?
  `

  //Query per il post
  connection.query(postsql, [id], (err, postResults) => {
    if (err) return res.status(500).json({ error: 'Database query failed' })
    if (postResults.length === 0) return res.status(404).json({ error: 'Post not found' })

    const post = postResults[0]

    // Query per i tag
    connection.query(tagsql, [id], (err, tagsResult) => {
      if (err) return res.status(500).json({ error: 'Database query failed' })

      post.tags = tagsResult // Aggiungo tag al post
      res.json(post) //risposta finale
    })
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



// destroy
function destroy(req, res) {
  const { identifier } = req.params

  const destroysql = `DELETE FROM db_posts.posts WHERE id = ?`
  connection.query(destroysql, [identifier], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to delete post' })
    res.sendStatus(204)
  })
}



module.exports = { index, show, destroy }
// show, store, update, modify, destroy }


