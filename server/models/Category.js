const mongoose = require('mongoose')
// const router = express.Router()


const schema = new mongoose.Schema({
    name: { type: String },
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})

module.exports = mongoose.model('Category', schema)