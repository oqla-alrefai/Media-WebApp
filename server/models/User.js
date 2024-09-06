const mongoose = require("mongoose")
const { Schema } = require("mongoose")


const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        min:4
    },
    email:{
        type: String,
        required: true,
        },
    password:{
        type: String,
        required: true
    },
    profilePicture:{
        type: String,
        default:""
    },
    coverPic:{
        type: String,
        default:""
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    bio:{
        type: String
    },
    from:{
        type: String
    },
    relationship: {
        type: Number,
        enum:[1, 2, 3]
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    }
})

module.exports = mongoose.model("User", userSchema)