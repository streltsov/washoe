import { bodyParser$ } from '@marblejs/middleware-body';
import { logger$ } from '@marblejs/middleware-logger';
import { cors$ } from '@marblejs/middleware-cors';
import { httpListener } from '@marblejs/core';
import { api$ } from './api';

const middlewares = [
  logger$(),
  bodyParser$(),
  cors$({
    origin: '*',
    allowHeaders: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  })
];

const effects = [
  api$,
];

export const listener = httpListener({
  middlewares,
  effects,
});
