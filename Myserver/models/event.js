const mongoose =require('mongoose');

const schema =mongoose.Schema;


const eventSchema = new schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    creator:{
        type:schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports=mongoose.model('Event',eventSchema)
