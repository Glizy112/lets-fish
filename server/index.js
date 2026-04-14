const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

require('./db/database');
require('dotenv').config();

const campaignRoutes = require('./routes/campaignRoutes');
const eventRoutes = require('./routes/eventRoutes');
const trackingRoutes = require('./routes/trackingRoutes');
const authSimulationRoutes = require('./routes/authSimulationRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();

app.use(cors());
app.use(express.json());

//Security Headers Implementation
app.use(
  helmet({
    // frameguard: {
    //   action: 'deny'    //clickjacking protection: prevents third-party sites to embed our app
    // },
    // contentSecurityPolicy: {    //Content Security Policy: prevents running externally injected JS/scripts, unauthorized API
    //   directives: {
    //     defaultSrc: ["'self'"],
    //     scriptSrc: ["'self'"],
    //     styleSrc: [
    //       "'self'",
    //       "'unsafe-inline'"
    //     ],
    //     imgSrc: [
    //       "'self'",
    //       "data:"
    //     ],
    //     connectSrc: [
    //       "'self'",
    //       "http://localhost:5173",
    //       "http://localhost:5000"
    //     ],
    //     objectSrc: ["'none'"],
    //     frameAncestors: ["'none'"],
    //     baseUri: ["'self'"]
    //   }
    // },
    referrerPolicy: {         //Strict Referrer Policy: prevents leaking sensitive URLs to external sites
      policy: 'no-referrer'
    },
    noSniff: true             //MIME Sniffing Protection: restricts the browser to stop guessing content-type
  })
);

//Browser Permissions Policy: prohibits the abuse of browser permissions such as camera, microphone & location.
app.use((req, res, next) => {
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );
  next();
});

//Security Headers Test Route: to check if defined security headers are active on the app.
app.get('/security-check', (req, res) => {
  res.json({
    message: 'Security headers active'
  });
});

app.use('/api/campaigns', campaignRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/track', trackingRoutes);
app.use('/api/sim', authSimulationRoutes);
app.use('/api/analytics', analyticsRoutes);

//Test route
app.get('/', (req, res) => {
  res.send('Let’s Fish backend running');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});