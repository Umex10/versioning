import express from 'express';
import cors from 'cors';
import v1Routes from './routes/v1';
import v2Routes from './routes/v2';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

const swaggerV1 = YAML.load(path.join(__dirname, './docs/swagger_v1.yaml'));
const swaggerV2 = YAML.load(path.join(__dirname, './docs/swagger_v2.yaml'));

app.use(
  '/api/v1/docs', 
  swaggerUi.serveFiles(swaggerV1), 
  swaggerUi.setup(swaggerV1)
);

app.use(
  '/api/v2/docs', 
  swaggerUi.serveFiles(swaggerV2), 
  swaggerUi.setup(swaggerV2)
);

// CRUD | Task (string)
app.use("/api/v1", v1Routes);

// CRUD | Task ({id, title, checked, createdAt})
app.use("/api/v2", v2Routes);

app.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
  console.log(`V1 is running on http://localhost:5000/api/v1/tasks`);
  console.log(`V2 is running on http://localhost:5000/api/v2/tasks`);
});