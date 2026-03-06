const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^+@\u007f+\.\u007f+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!` 
        }
    },
    message: {
        type: String,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact', contactSchema);