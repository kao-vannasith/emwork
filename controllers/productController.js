const db = require('../models')
const { Op, fn, col } = require('sequelize');

// image Upload
const multer = require('multer')
const path = require('path')


// create main Model
const Product = db.products
const Review = db.reviews

// main work

// 1. create product

const addProduct = async (req, res) => {

    let info = {
        type: req.body.type,
        title: req.body.title,
        price: req.body.price,
        date: req.body.date,
        date_add: req.body.date_add,
        date_update: req.body.date_update
    }

    const product = await Product.create(info)
    res.status(200).send(product)
    console.log(product)

}



// 2. get all products

const getAllProducts = async (req, res) => {

    let products = await Product.findAll({})
    res.status(200).send(products)

}
//////////////

const getCountProducts = async (req, res) => {

    let products = await Product.findAll({
        attributes: [
            [fn('SUM', col('price')), 'totalPrice']
          ]
    })
    res.status(200).send(products)

}

/////////////
const getAllProductsMonth = async (req, res) => {

    var year = req.query.year;
    var month = req.query.month; 
    console.log(year,month)
    let products = await Product.findAll({
        where: {
            date: {
              [Op.between]: [
                new Date(year, month - 1, 1),  // Start of the month (Note: month is 0-indexed)
                new Date(year, month, 0)       // End of the month
              ]
            }
          }
    })
    res.status(200).send(products)

}

// 3. get single product

const getOneProduct = async (req, res) => {

    let id = req.params.id
    let product = await Product.findOne({ where: { id: id }})
    res.status(200).send(product)

}

// 4. update Product

const updateProduct = async (req, res) => {

    let id = req.params.id

    const product = await Product.update(req.body, { where: { id: id }})

    res.status(200).send(product)
   

}

// 5. delete product by id

const deleteProduct = async (req, res) => {

    let id = req.params.id
    
    await Product.destroy({ where: { id: id }} )

    res.status(200).send('Product is deleted !')

}

// 6. get published product

const getPublishedProduct = async (req, res) => {

    const products =  await Product.findAll({ where: { published: true }})

    res.status(200).send(products)

}

// 7. connect one to many relation Product and Reviews

const getProductReviews =  async (req, res) => {

    const id = req.params.id

    const data = await Product.findOne({
        include: [{
            model: Review,
            as: 'review'
        }],
        where: { id: id }
    })

    res.status(200).send(data)

}


// 8. Upload Image Controller

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')









module.exports = {
    addProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getPublishedProduct,
    getProductReviews,
    getAllProductsMonth,
    getCountProducts,
    upload
    
}