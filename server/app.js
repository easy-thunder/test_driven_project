// app.js (or whatever file contains your createAPP function)
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';

const createAPP = () => {
  const app = express();
  app.use(cors());
  app.use(json());

  // Define routes and middleware here
  app.get('/', (req, res) => {
    res.status(200).send('OK');
  });

  return app;
};

export default createAPP;