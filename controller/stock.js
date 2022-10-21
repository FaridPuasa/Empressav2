const stockDB = require('../models/stocks')
const moment = require('moment')

const insertStock = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let data = req.body
    let stock = new stockDB({
        productBrand: data.productBrand,
        productName: data.productName,
        productDescription: data.productDescription,
        productEntity: data.productEntity,
        productCategory: data.productCategory,
        productQuantity: data.productQuantity,
        productPrice: data.productPrice,
        productSalePrice: data.productSalePrice,
        productVariety: data.productVariety,
        productVarietyQuantity: data.productVarietyQuantity,
        createdBy: data.createdBy,
        dateCreated: date,
    })
    stock.save(err=>{
        if(err){
            console.log (err)
            res.flash('error', `Tracking number already exist | Require fields missing`)
        }
        else{
            console.log('Status: 201 - success entry to database')
            req.flash('success', `${data} has been added to the database.`)
            res.status(201).send()
        }
    })
})

const readStock = ((req,res)=>{
    let id = req.params._id
    let product = req.params.product || "ZALORA"
    let position = currentUser.position
    stockDB
        .find({product: product})
        .sort({entryDate: -1})
        .lean()
        .count(product)
        .exec((err,data)=>{
            if (err) return console.log(err)
            else{
                res.status(200)
                res.render(xxx, {
                    stockList: data,
                })
            }
        })
        
})

const updateStock = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let data = req.body
    let filter = {productID: data.productID}
    let update = {
        productPrice: data.productPrice,
        productSalePrice: data.productSalePrice,
        productQuantity: data.productQuantity,
        $push:{
            productVariety: data.productVariety,
            productVarietyQuantity: data.productVarietyQuantity,
        }
    }
    let option = {upsert: false, new: false}
    stockDB.findOneAndUpdate(filter,update,option, (err,result)=>{
        if (err){
            console.log(err)
            console.log(`${tracker} failed to be updated.`)
            res.status(400).send()
            res.flash('error', `Failed to update ${tracker}`)
        }
        else{
            console.log(result)
            console.log(`${tracker} has been updated.`)
            res.status(201).send()
            res.flash('success', `${tracker} has been updated.`)
            res.end()
        }
    }) 
})

const removeStock = ((req,res)=>{
    
})

module.exports = {
    insertStock,
    readStock,
    updateStock,
    removeStock
}