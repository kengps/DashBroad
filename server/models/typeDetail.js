const mongoose = require('mongoose');

const dataSchemaType = mongoose.Schema({
    data: {
        main: {
            typeName: String,
            sub: {
                name: String,
                detail: String
            }
        }
    }
}, { timestamps: true });

const DataModelType = mongoose.model('TypeDataModel', dataSchemaType);

module.exports = DataModelType;
