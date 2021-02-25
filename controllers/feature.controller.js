const Feature = require('../models/Feature')

exports.updateFeature = async (req, res) => {
    try {
        await Feature.findOneAndUpdate({
            _id: id
        }, req.body.data);
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}

exports.getLastestFeature = async (id) => {
    try {
        const features = await Feature.find({
            active: { $eq: true }
        }).exec();
        return { success: true, data: features }
    } catch (error) {
        return { success: false }
    }
}