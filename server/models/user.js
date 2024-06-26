const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
          type: String,
          required: true
    },
    avatar:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    },

      reported:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
      ],

})



module.exports = User = mongoose.model('User', UserSchema)