import { createServer } from "@marblejs/core";
import { listener } from "../http.listener";
import { IO } from "fp-ts/lib/IO";

const server = createServer({
  hostname: "127.0.0.1",
  port: 1337,
  listener
});

export const startServer: IO<void> = async () =>
  await (await server)();
