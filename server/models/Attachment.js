const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  article: { type: String },
  originalname: { type: String },
  url: { type: String },
  filetype: { type: String }
})

module.exports = mongoose.model('Attachment', schema)