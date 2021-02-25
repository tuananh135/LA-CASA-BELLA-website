const mongoose = require('mongoose');

const FeatureSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    background: {
        type: String,
        required: true
    },
    header: {
        type: String,
        required: true
    },
    createdate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const Feature = mongoose.model('Feature', FeatureSchema);

module.exports = Feature;
