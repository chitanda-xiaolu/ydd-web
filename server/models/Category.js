const mongoose = require('mongoose')
const router = express.Router()


const schema = new mongoose.Schema({
    name: {type: String}
})

module.exports = mongoose.model('Category', schema)