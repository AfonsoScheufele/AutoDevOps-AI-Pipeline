import helmet from 'helmet';
import cors from 'cors';

export default function security(app) {
  app.use(helmet());
  app.use(cors());
}
