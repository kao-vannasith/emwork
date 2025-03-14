// import controllers review, products
const { Router } = require('express')
const productController = require('../controllers/productController.js')
const reviewController = require('../controllers/reviewController')


// router
const router = require('express').Router()


// use routers
//router.post('/addProduct', productController.upload , productController.addProduct)
router.post('/addProduct', productController.addProduct)

router.get('/allProducts', productController.getAllProducts)

router.get('/published', productController.getPublishedProduct)

router.get('/getMonth', productController.getAllProductsMonth)

router.get('/countAll', productController.getCountProducts)


// Review Url and Controller

router.get('/allReviews', reviewController.getAllReviews)
router.post('/addReview/:id', reviewController.addReview)

// get product Reviews
router.get('/getProductReviews/:id', productController.getProductReviews)




// Products router
router.get('/:id', productController.getOneProduct)

router.put('/:id', productController.updateProduct)

router.delete('/:id', productController.deleteProduct)

module.exports = router