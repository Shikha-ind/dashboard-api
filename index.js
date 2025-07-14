
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const userRoutes = require('./routes/users');
const teamRoutes = require('./routes/teamRoutes');
const documentRoutes = require('./routes/documentRoutes');
const testimonialRoutes = require('./routes/testimonialsRoutes');
const aspireRoutes = require('./routes/aspireRoutes');
const caseStudyRoutes = require('./routes/casestudyRoutes');
const riskRoutes = require('./routes/riskRegisterRoutes');

const app = express();
const PORT = 4000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/testimonials', testimonialRoutes);

// Static folder for serving uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/aspire', aspireRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/risk-register', riskRoutes);

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
