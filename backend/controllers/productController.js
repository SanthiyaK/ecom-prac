const Product= require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures=require('../utils/apiFeatures');

///Get products -- api/v1/products
exports.getProducts = catchAsyncError(async (req,res,next)=>{
    const resperpage= 2;
   const apiFeatures= new APIFeatures(Product.find(), req.query).search().filter().paginate(resperpage);
  const products=await apiFeatures.query;
   res.status(200).json({
        success : true,
        count:products.length,
        products
    })
})
//create product- /api/v1/product/new
exports.newProduct= catchAsyncError(async (req,res,next)=>{
    req.body.user = req.user.id;
 const product= await Product.create(req.body);
    res.status(201).json({
        success : true,
       product
    }) 
});
//get Single product -/api/v1/product/:id
exports.getSingleProduct = async (req,res,next) => {
    const product = await Product.findById(req.params._id);
    if(!product) {
        return next(new ErrorHandler('Product not found', 400));
    }
    res.status(201).json({
        success : true,
        product
    }) 
}
//update product - /api/v1/product/:id
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if(!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        product
    })
}

//Delete Product - api/v1/product/:id
exports.deleteProduct = async (req, res, next) =>{
    const product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    await product.deleteOne() ;

    res.status(200).json({
        success: true,
        message: "Product Deleted!"
    })

}