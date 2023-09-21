const mongoose = require('mongoose');


const contactSchema=new mongoose.Schema({
   
    contactus:{
        email: { type: String, required: true },
        message: { type: String, required: true },
    },
 
},{timestamps:true})

const Contact=mongoose.model('contactus',contactSchema);

module.exports=Contact;