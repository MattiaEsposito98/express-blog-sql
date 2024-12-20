const express = require('express')
const router = express.Router()
// const posts = require('../data/posts')
const postController = require('../controllers/postController')


//index 
router.get('/', postController.index)


//show
// router.get('/:identifier', postController.show)



//Store
// router.post('/', postController.store)



// Update
// router.put('/:identifier', postController.update)



// modify
// router.patch('/:identifier', postController.modify)


// destroy
// router.delete('/:identifier', postController.destroy)

module.exports = router