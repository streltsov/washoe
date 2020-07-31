import { combineRoutes } from '@marblejs/core';
import { login$ } from './login';

export const api$ = combineRoutes('/api/v1', [
  login$
]);
