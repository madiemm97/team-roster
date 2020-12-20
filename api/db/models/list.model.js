const mongoose = require('mongoose'); 

const ListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    touchdowns: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    },
    rushingYards: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    }
})

const List = mongoose.model('List', ListSchema);

module.exports = { List }