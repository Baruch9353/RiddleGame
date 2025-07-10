import express from 'express';
// import configRoutes from './routes/configRoutes.js';
import logger from './middlewares/logger.js';

const app = express();
app.use(express.json());
app.use(logger);

// configRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));