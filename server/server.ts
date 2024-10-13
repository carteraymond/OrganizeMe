import express from 'express';
const app = express();

const port: number = 3000;

app.use(express.json());
app.use('/', require('./routes'))

app.listen(port, (): void => {
  console.log(`Server listening at http://localhost:${port}`);
});