console.log("Blog")
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
// const posts = require('./data/posts')
const postsRouter = require('./routers/PostsR')
const errorsHandler = require('./middlewares/errorsHandler')
const notFound = require('./middlewares/notFound')


app.use(cors())
app.use(express.static('pubblic'))
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Server del mio blog')
})

//importo Router tramite funzione use
app.use("/posts", postsRouter)

app.get('/posts', (req, res) => {
  res.json({
    count: posts.length,
    posts: posts
  })
})

app.use(errorsHandler)
app.use(notFound)

app.listen(port, () => {
  console.log(`Porta in ascolto ${port}`)
})