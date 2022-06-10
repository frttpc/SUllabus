const { MinKey } = require('mongodb')
const mongoose = require('mongoose')

const contentSchema = new mongoose.Schema({

    week: {
        type: String,
        required: true,
        
    },

    subject: {
        type: String,
        required: true 
    },

    context: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Content', contentSchema)