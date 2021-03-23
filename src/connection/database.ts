import mongoose from 'mongoose';
import chalk from "chalk"

// Connection
export const connectToDatabase = () =>
  mongoose.connect('mongodb://localhost:27017/washoe', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(onError);

const onError = (error: mongoose.Error) => {
  console.error(chalk.red(`[Database] connection error: ${error.message}`));
  process.exit();
};
