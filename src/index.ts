import { connectToDatabase, startServer } from "./connection";

connectToDatabase()
  .then(startServer)