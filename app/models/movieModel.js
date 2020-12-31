let mongoose = require('mongoose');

module.exports = () => {
    const MoviesSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        duration: {
            type: String
        },
        type: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    });

    return mongoose.model('Movies', MoviesSchema);
}