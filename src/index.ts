import express, { Request, Response } from 'express'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import apiRouter from './routes/api';
import { swaggerConfig } from './config/swagger';

const app = express();
const PORT = 80;
app.use(express.json())
app.use(apiRouter);

const swaggerDocs = swaggerJsdoc(swaggerConfig);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
