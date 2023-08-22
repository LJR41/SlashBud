// 1. import mongoose
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

// 2.1 create the schema with all keys & validation
const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "First name is required"],
        minlength: [2, "First name must be 2 characters or more "]
    },
    lastName:{
        type: String,
        required: [true, "Last name is required"],
        minlength: [2, "Last name must be 2 characters or more "]
    },
    displayName:{
        type: String,
        required: [true, "Username is required"],
        minlength: [2, "Display name must be 2 characters or more "]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        minlength: [2, "Email must be 2 characters or more "],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
          }
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minlength: [2, "Password must be 2 characters or more "]
    },
    lists: [{
        type: Schema.Types.ObjectId,
        ref: "List"
    }]
    
}, {timestamps: true,}) // 2.2 enable the timestamp for createdAt & updatedAt

UserSchema.virtual('confirmpassword')
    .get(function() {
        return this._confirmpasword
    })
    .set(function(value) {
        this._confirmpasword = value
    })

    UserSchema.pre("validate", function(next) {
        if(this.password != this.confirmpassword) {
            this.invalidate("confirmpassword", "passwords must match")
        }
        next();
    });

UserSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next()
    })
    .catch(err=> {
        console.log("HASHING PASSWORD DID NOT WORK", err)
        next()
    })
});


// 3. create a mongoose model based on the schema & export it
const User = mongoose.model('User', UserSchema)

module.exports = User