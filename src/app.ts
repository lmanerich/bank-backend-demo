import routes from '@src/routes';
import express from 'express';

const app: express.Application = express();

app.use(express.json());

routes(app);

export default app;
