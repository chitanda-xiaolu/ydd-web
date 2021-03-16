const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  article: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Article' }],
  url: { type: String }
})

module.exports = mongoose.model('Article', schema)