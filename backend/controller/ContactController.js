const asycHandler =require('../middleware/asyncHandler')
const contactData=require('../model/contactModel');


exports.postContact =asycHandler(async (req, res) => {
  const { email, message } = req.body;

    const newContact = new contactData({
        contactus: { email, message },
    });

    const createdContact = await newContact.save();
    if(createdContact){
      res.status(201).json({
        message: 'Message sent successfully',
        data: createdContact
    });
    }else{
      res.status(404);
      throw new Error('Contact not send');
    }
  
  });

exports.getContact =asycHandler(async (req, res) => {
  const contacts = await contactData.find({});
  res.json(contacts);
});

exports.getContactById =asycHandler(async (req, res) => {
  const contact = await contactData.findById(req.params.id);

  if (contact) {
      res.json(contact);
  } else {
      res.status(404);
      throw new Error('Contact not found');
  }
});
