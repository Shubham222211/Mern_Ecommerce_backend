const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    mobileNumber: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid 10-digit mobile number!`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: 
        { type: String, required: true },
    
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
