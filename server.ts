import express from 'express';
import routes from './src/routes';
import connectDB from './src/database/mongodb';

// This connects the mongoose client and will persist for the application's life cylce
connectDB();

const app = express();
const port: number = 3000;


app.use(express.json());
app.use('/', routes);

app.listen(port, (): void => {
  console.log(`Server listening at ${port}`);
});

// Below is code for testing. This will be removed at a later stage.
// import { createNewUser } from './services/userService';

// var createdUser = await createNewUser("test@test.com", "hash", "Johnny", "Sanabria");
