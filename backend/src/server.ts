import './controllers'

import * as express from 'express'

import { appRouter } from './route.decorator'

const app = express();

app.use(express.json());
app.use(appRouter);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
