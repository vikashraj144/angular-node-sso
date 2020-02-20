module.exports.getBrandIdValidator = (req,res,next) => {
    let brandId = req.params.brandId;
    if(brandId){
        next();
    }
    else{
        return res.status(400).json({error:'brandId required in params'});
    }
}
module.exports.postBrandIdValidator = (req,res,next) => {
    let brandId = req.body.brandId;
    if(brandId){
        next();
    }
    else{
        return res.status(400).json({error:'brandId required in body'});
    }
}
