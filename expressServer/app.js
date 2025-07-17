import express from 'express';
import riddlesConfigRoutes from './routes/configRoutes.js';
import logger from './middlewares/logger.js';
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(logger);

riddlesConfigRoutes(app); 


app.use((req, res) => {
  res.status(404).send("Route not found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));