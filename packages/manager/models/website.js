const mongoose = require('mongoose')

const spaSchema = new mongoose.Schema({
    spaId: {
        type: String,
        //  required: true
    },
    repositoryLink: {
        type: String,
    },
    spaName: {
        type: String,
    },
    contextPath: {
        type: String,
    },
    envs: [{
        type: String,
        required: true
    }],
}, { _id: false });

const repositoryConfigs = new mongoose.Schema({
    repositoryLink: {
        type: String,
    },
    branch: {
        type: String,
    },
}, { _id: false });

const webstite = new mongoose.Schema({
    websiteId: {
        type: String,
        required: true
    },
    websiteName: {
        type: String,
        required: true
    },
    repositoryConfigs: [repositoryConfigs],
    gitToken: {
        type: String,
        required: false
    },
    spas: [spaSchema],
    isActive: {
        type: Boolean,
        required: false
    },
    createdAt: {
        type: Date,
        required: false
    },
    updatedAt: {
        type: Date,
        required: false
    },
})

module.exports = mongoose.model('webstite', webstite)