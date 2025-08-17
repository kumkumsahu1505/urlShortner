const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId :{
        type: String,
        required: true,
        unique: true
    },
    redirectUrl :{
        type : String,
        required : true,
    },
    VisitHistory :{
        type : [
            {timeStamp: 
                {type: Date}
            }
        ]
    },
    createdBy :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const urlModel = mongoose.model('Url',urlSchema)

module.exports = urlModel;