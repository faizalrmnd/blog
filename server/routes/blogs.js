const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

/* GET home page. */
router.get('/article', blogController.getArticle);
router.post('/:id/post', blogController.addArticle);
router.put('/:id/edit', blogController.addArticle);
router.delete('/:id/delete', blogController.addArticle);

module.exports = router;
