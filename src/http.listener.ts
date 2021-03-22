import { bodyParser$ } from "@marblejs/middleware-body";
import { logger$ } from "@marblejs/middleware-logger";
import { httpListener } from "@marblejs/core";
import { api$ } from "./api.effect";

const middlewares = [
  logger$(),
  bodyParser$()
];

const effects = [
  api$
];

export const listener = httpListener({
  middlewares,
  effects
});
