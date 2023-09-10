// 1. import mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 2.1 create the schema with all keys & validation
const ListSchema = new mongoose.Schema({
    listName:{
        type: String,
        required: [true, "Please give this list a name"],
        maxlength: [30, "Please keep the name less than 30 characters"]
    },
    listObjects: [
        {
        title: String,
        imageURL: String,
    }
    ],
    isGames:{
        type: Boolean,
        default: false,
    },
    isCharacters:{
        type: Boolean,
        default: false,
    },
    isPrivate:{
        type: Boolean,
        default: false,
    },
    isPublic:{
        type: Boolean,
        default: true,
    },
    isFavorite:{
        type: Boolean,
        default: true
    },
    listOwner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }


}, {timestamps: true})// 2.2 enable the timestamp for createdAt & updatedAt


// 3. create a mongoose model based on the schema & export it
const List = mongoose.model('List', ListSchema)

module.exports = List