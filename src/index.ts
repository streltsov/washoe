import { connectToDatabase, startServer } from "./connections";

connectToDatabase()
  .then(startServer)