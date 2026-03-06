const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/philtech', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Student Application Schema
const studentApplicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gradeLevel: {
    type: String,
    enum: ['senior-high', 'college'],
    required: true,
  },
  strand: {
    type: String,
    enum: ['humms', 'ict', 'he', 'abm', 'tvl', ''],
  },
  course: {
    type: String,
    enum: ['bscs', 'btvted', 'bsoa', ''],
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Contact Form Schema
const contactFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create Models
const StudentApplication = mongoose.model('StudentApplication', studentApplicationSchema);
const ContactForm = mongoose.model('ContactForm', contactFormSchema);

// Routes

// Submit Student Application
app.post('/api/apply', async (req, res) => {
  try {
    const { studentName, studentEmail, studentGrade, studentStrand, studentCourse, studentMessage } = req.body;

    const application = new StudentApplication({
      fullName: studentName,
      email: studentEmail,
      gradeLevel: studentGrade,
      strand: studentStrand || '',
      course: studentCourse || '',
      message: studentMessage,
    });

    await application.save();
    res.status(201).json({
      success: true,
      message: 'Thank you for applying to PhilTech. Our admissions team will contact you soon!',
      data: application,
    });
  } catch (error) {
    console.error('Error saving application:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting application. Please try again.',
      error: error.message,
    });
  }
});

// Submit Contact Form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = new ContactForm({
      name,
      email,
      message,
    });

    await contact.save();
    res.status(201).json({
      success: true,
      message: 'Thank you for contacting PhilTech. We will get back to you soon!',
      data: contact,
    });
  } catch (error) {
    console.error('Error saving contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form. Please try again.',
      error: error.message,
    });
  }
});

// Get All Student Applications (for admin)
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await StudentApplication.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving applications',
      error: error.message,
    });
  }
});

// Get All Contact Forms (for admin)
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await ContactForm.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving contacts',
      error: error.message,
    });
  }
});

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
