// models/Contact.js
const mongoose = require("mongoose");

// Contact Form Schema
const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters long"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
      lowercase: true,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
      default: null,
    },
    phone: {
      type: String,
      trim: true,
      default: null,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      minlength: [10, "Message must be at least 10 characters long"],
    },
    status: {
      type: String,
      enum: ["new", "replied", "archived"],
      default: "new",
    },
    ipAddress: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
    isSpam: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // یہ خودکار createdAt اور updatedAt شامل کرے گا
  },
);

// Index for better query performance
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });

// Method to get full name
contactSchema.methods.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

// Method to mark as replied
contactSchema.methods.markAsReplied = function () {
  this.status = "replied";
  return this.save();
};

// Method to mark as spam
contactSchema.methods.markAsSpam = function () {
  this.isSpam = true;
  return this.save();
};

// Static method to get new messages
contactSchema.statics.getNewMessages = function () {
  return this.find({ status: "new" }).sort({ createdAt: -1 });
};

// Static method to get all non-spam messages
contactSchema.statics.getValidMessages = function () {
  return this.find({ isSpam: false }).sort({ createdAt: -1 });
};

// Static method to get messages by email
contactSchema.statics.getByEmail = function (email) {
  return this.find({ email: email }).sort({ createdAt: -1 });
};

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
