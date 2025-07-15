const express = require('express');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit')

const userRoutes = require('./routes/users');
const teamRoutes = require('./routes/teamRoutes');
const documentRoutes = require('./routes/documentRoutes');
const testimonialRoutes = require('./routes/testimonialsRoutes');
const aspireRoutes = require('./routes/aspireRoutes');
const caseStudyRoutes = require('./routes/casestudyRoutes');
const riskRoutes = require('./routes/riskRegisterRoutes');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Moniter / block the proxy server after attempting password reset
app.set('trust proxy',1); 

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/aspire', aspireRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/risk-register', riskRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});


