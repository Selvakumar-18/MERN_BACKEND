const mongoose = require('mongoose')

// Employee add panel
const Employee = new mongoose.Schema(
  {
    id:{
      type:String,
      required:true
    },
    name:{
      type:String,
      required:true
    },
  },

  {collection:'user-name'}
)

const model = mongoose.model('UserEmployee',Employee)
module.exports = model