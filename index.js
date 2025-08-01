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
<<<<<<< HEAD
const rcaRoutes = require('./routes/rcaRoutes');
const issuesTrackerRoutes = require('./routes/issuesTrackerRoutes');
const projectReportsRoutes = require('./routes/projectReportRoutes');
const revenueRoutes = require('./routes/revenueRoutes');
=======
>>>>>>> dfad0aac13c9f894441de146218bfe07c7d9a5bc

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
<<<<<<< HEAD
//if needed
app.use(cors({
  origin: '*', // or specify exact frontend origin
  credentials: true
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
=======
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
>>>>>>> dfad0aac13c9f894441de146218bfe07c7d9a5bc

//Moniter / block the proxy server after attempting password reset
app.set('trust proxy',1); 

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/rca', express.static(path.join(__dirname, 'uploads', 'rca')));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/aspire', aspireRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/risk-register', riskRoutes);
<<<<<<< HEAD
app.use('/api/rca', rcaRoutes);
app.use('/api/issues-tracker', issuesTrackerRoutes);
app.use('/api/projects-reports', projectReportsRoutes);
app.use('/api/revenue', revenueRoutes);
=======
>>>>>>> dfad0aac13c9f894441de146218bfe07c7d9a5bc


// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});


