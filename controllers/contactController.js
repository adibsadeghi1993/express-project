const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @ desc get all contacts
// @route get api/contacts
// access private
const getContacts = asyncHandler(async (req, res) => {
  console.log(req);
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @ desc create new contact
// @route post api/contacts
// access private
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all field are mandetory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

// @ desc get contact
// @route get api/contacts/:id
// access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  res.status(200).json(contact);
});

// @ desc update contact
// @route update api/contacts/:id
// access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user dont have permission to update other user contact");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

// @ desc delete contact
// @route delete api/contacts/:id
// access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not sss found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user dont have permission to delete other user contact");
  }
  await Contact.deleteOne();
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
