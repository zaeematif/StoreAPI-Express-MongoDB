const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({}).sort('-name price').limit(4);

    res.status(200).json({nbHits: products.length, products})
}

const getAllProducts = async (req, res) => {
    const {featured, company, name, sort, fields} = req.query;
    const queryObject = {}

    if(featured){
        queryObject.featured = (featured === "true" ? true : false)
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex: name, $options: 'i'}
    }

    //array is not provided only result object is given to add sorting query
    let result = Product.find(queryObject);

    //sort
    if(sort){
        // '-name, price' -> '-name price'
        const sortList = sort.split(",").join(' ');
        result = result.sort(sortList)
    }else{
        result = result.sort('createdAt')
    }

    //fields
    if(fields){
        // 'name, price' -> 'name price'
        console.log(fields);
        
        const fieldList = fields.split(",").join(' ');
        result = result.select(fieldList)
    }

    const products = await result;
 
    res.status(200).json({nbHits: products.length, products})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}


