const stockDB = require('../models/stocks')
const moment = require('moment')

const insertStock = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY")
    let data = req.body
    let sequence = data.sequence
    let product_id = "INS# " + sequence
    let stock = new stockDB({
        product_id: product_id,
        sequence: sequence,
        productEntity: data.productEntity,
        productName: data.productName,
        productCategory: data.productCategory,
        productOther: data.productOther,
        productQuantity: data.productQuantity,
        productPrice: data.productPrice,
        productSalePrice: data.productSalePrice,
        productExpiry: data.productExpiry,
        productColor:data.productColor,
        productSize: data.productSize,
        quantity: data.quantity,
        uid: data.uid,
        name: data.name,
        dateCreated: date,
    })
    stock.save(err=>{
        if (err) {
            console.log (err)
            res.flash('error', `Tracking number already exist | Require fields missing`)
            res.render('error', {
                errorcode: 'XXX',
                response: 'Not Acceptable &#x1F62B;',
                message: 'No worries~ database detected duplication of tracking number.'
            })
        }
        else{
            console.log('Status: 200 - success entry to database')
            req.flash('success', `${data} has been added to the database.`)
            res.status(200).redirect('/in_stock')
        }
    })
})

const readStock = ((req,res)=>{
    let id = req.params._id
    //let product = req.params.product || "ZALORA"
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