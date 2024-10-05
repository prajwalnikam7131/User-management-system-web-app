const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        // validate: {
        //     validator: function (v) {
        //         return /\d{3}-\d{3}-\d{4}/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid phone number!`
        // },
        required: [true, 'User phone number required'],
    },
    email: {
        type: String,
        unique: true,
        validator: function (v) {
            // Basic regex for validating email format
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
    },
    details: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
});


// for search box
userSchema.index({ firstname: 'text', lastname: 'text' });


const User = mongoose.model('User', userSchema);

module.exports = User;
