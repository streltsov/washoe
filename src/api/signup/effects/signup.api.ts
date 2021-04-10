import { EffectFactory } from '@marblejs/core';
import { signupEffect$ } from './signup.effect';


export const signup$ = EffectFactory
  .matchPath('/signup')
  .matchType('POST')
  .use(signupEffect$);

// export const auth$ = combineRoutes('/auth', [login$]);
