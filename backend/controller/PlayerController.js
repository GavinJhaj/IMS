const asycHandler =require('../middleware/asyncHandler')
const productsdata=require('../model/playerModel');

exports.getAllproducts =asycHandler(async (req, res) => {

  // const product=await productsdata.find({});
  // res.json(product)

  const pageSize=5;
  const page=Number(req.query.pageNumber)||1;

  const keyword=req.query.keyword?{name:{$regex:req.query.keyword,$options:'i'}}:{};


  const count=await productsdata.countDocuments({...keyword});
  const product=await productsdata.find({...keyword}).limit(pageSize).skip(pageSize*(page-1));
  res.json({product,page,pages:Math.ceil(count/pageSize)});
});

exports.getSingleProduct = asycHandler(async(req, res) => {
  console.log(req.params.id);
  const product=await productsdata.findById(req.params.id)
  if(product){
    res.json(product)
  }
  else{
    res.status(404)
    throw new Error('resource not found')
  }
});

exports.createProduct=asycHandler(async (req, res) => {
  const product=new productsdata({
    name:'-',
    dateOf:' ',
    user:req.user._id,
    image:' ',
    brand: ' ',
    category: ' ',
    countInStock:' ',
    description:' ',
  })
  const createProduct=await product.save();
  res.status(201).json(createProduct);
});


exports.updateProduct=asycHandler(async (req, res) => {
  const {name,dateOf,description,image,brand,category,countInStock}=req.body;
  const product=await productsdata.findById(req.params.id)
  if(product){
    product.name=name;
    product.dateOf=dateOf;
    product.description=description;
    product.image=image;
    product.brand=brand;
    product.category=category;
    product.countInStock=countInStock;

    // const updatedProduct=await product.save();
    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct)
    
  }else{
    res.status(404);
    throw new Error('Resource not found')
  }
  
});



exports.deleteProduct=asycHandler(async (req, res) => {
  const product=await productsdata.findById(req.params.id)
  if(product){
    await productsdata.deleteOne({_id:product._id});
    res.status(200).json({message:'Injury deleted'})
    
  }else{
    res.status(404);
    throw new Error('Resource not found')
  }
  
});


//create review

exports.createProductReview=asycHandler(async (req, res) => {
  const {rating,comment}=req.body;

  const product=await productsdata.findById(req.params.id)

  if(product){
    const alreadyReviewd=product.reviews.find(
      (review)=>review.user.toString()===req.user._id.toString()
    )

    if(alreadyReviewd){
      res.status(400);
      throw new Error('Injury already reviewed')
    }

    const review={
      name:req.user.name,
      rating:Number(rating),
      comment,
      user:req.user._id,
    };

    product.reviews.push(review);

    product.numReviews=product.reviews.length;

    product.rating=product.reviews.reduce((acc,review)=>acc+review.rating,0)/product.reviews.length;

    await product.save();
    res.status(200).json({message:'Review Added'})
    
    
  }else{
    res.status(404);
    throw new Error('Resource not found')
  }
  
});

