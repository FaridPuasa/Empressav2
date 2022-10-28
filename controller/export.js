const warehouseDB = require('../models/warehouseInventory')
const moment = require('moment')

const exportInventory = (req,res) =>{
    let date = moment().format('DD/MM/YYYY')
    let data = req.body
    let filter = {$or: [{service: data.service,currentStatus: data.currentStatus}],
        $gte: {dateEntry: data.start},
        $lte: {dateEntry: data.end}
    }
    warehouseDB.find(filter).sort({trackingNumber: 1}).then(
        (result)=>{
            console.log('Successfully extracted required data.')
            console.log(result)
            res.render()
        },
        (err)=>{
            console.log('Failed to extract required data.')
            console.log(err)
            res.render('error', {
                title: 'Extraction Error',
                error_code: '',
                response: '',
                message: ''
            })
        }
    )
}

module.exports = {
    exportInventory,

}