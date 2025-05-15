const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const cookSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: String,
    bio: String
})

const Cook = mongoose.model('Cook', cookSchema);

module.exports = Cook;