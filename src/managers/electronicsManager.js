const Electronics = require('../models/Electronics')

exports.create = (data) => Electronics.create(data);

exports.getAll = async () => {
    let result = await Electronics.find().lean();

    return result;
}

exports.getAllByQuery = async (searchName ,searchType) => {
    let result = await Electronics.find().lean();

    if (searchName) {
        result = result.filter(electronics => {
            electronics.name.toLowerCase().includes(searchName.toLowerCase());
        })
    }

    if (searchType) {
        result = result.filter(electronics => {
            electronics.type.toLowerCase().includes(searchType.toLowerCase());
        })
    }

    return result;
}

exports.getOne = (id) => Electronics.findById(id).populate('owner');

exports.delete = (id) => Electronics.findByIdAndDelete(id);

exports.edit = (id, data) => Electronics.findByIdAndUpdate(id, data);
