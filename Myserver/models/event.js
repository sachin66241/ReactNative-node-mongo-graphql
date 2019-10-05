const mongoose =require('mongoose');

const schema =mongoose.Schema;


const eventSchema = new schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:false
    }
})

module.exports=mongoose.model('Event',eventSchema)
