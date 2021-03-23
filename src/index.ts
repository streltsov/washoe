import { connectToDatabase } from './connection/database';
import { createServer } from "@marblejs/core";
import { listener } from "./http.listener";
import { IO } from "fp-ts/lib/IO";

const server = createServer({
  hostname: "127.0.0.1",
  port: 1337,
  listener
});

const main: IO<void> = async () =>
  await (await server)();

connectToDatabase()
  .then(main)