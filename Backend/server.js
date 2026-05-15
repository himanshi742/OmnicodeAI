const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '.env')
});

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const aiRoutes = require('./routes/aiRoutes');
const historyRoutes = require('./routes/historyRoutes');
const supportRoutes = require('./routes/support');
const paymentRoutes = require('./routes/paymentRoutes');
const contactRoutes = require('./routes/contactRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

connectDB();

const app = express();


app.use(cors({ 
  origin: [
    'http://localhost:5173', 
    'https://omnicode-ai-frontend.vercel.app' 
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true // Important if you use cookies or authorization headers
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Omnicode AI API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes); 
app.use('/api/support', supportRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/settings', require('./routes/settingsRoutes'));


// FIX 2: Handle local development vs Vercel Serverless
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running in development mode on port ${PORT}`);
  });
}

// Required for Vercel to turn Express into a serverless function
module.exports = app;