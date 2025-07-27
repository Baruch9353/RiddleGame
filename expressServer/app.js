import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import configRoutes from './routes/configRoutes.js';
import logger from './middlewares/logger.js';
import { connectToMongo } from './DB/mongoClient.js';
dotenv.config();

const app = express();

app.use(cookieParser()); 
app.use(express.json());
app.use(logger);

configRoutes(app);

app.use((req, res) => {
  res.status(404).send("Route not found");
});

await connectToMongo();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
