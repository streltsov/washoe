import { combineRoutes } from '@marblejs/core';
import { signup$ } from "./signup";

export const api$ = combineRoutes('/api/v1', [
  signup$
]);
