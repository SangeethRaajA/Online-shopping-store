const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/').get((req,res)=>{
    Product.find()
        .then(products=>res.json(products))
        .catch(err=>err.status(400).json('Error:'+err))
})

router.route('/add').post((req,res)=>{
    const productname = req.body.username;
    const description = req.body.description;
    const gender = req.body.gender;
    const category = req.body.category;
    const size = req.body.size;
    const price = Number(req.body.price);
    const quantity = Number(req.body.quantity);

    const newProduct = new Product({
        productname,
        description,
        gender,
        category,
        size,
        price,
        quantity
    })

    newProduct.save()
        .then(()=>res.json("Product Added!"))
        .catch(err=>res.status(400).json('Err:'+err))
})

router.route('/:id').get((req,res)=>{
    Product.findById(req.params.id)
        .then(product=>res.json(product))
        .catch(err=>res.status(400).json('Error'+ err));
})

module.exports = router;