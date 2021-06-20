import { r } from '@marblejs/core';
import { signupEffect$ } from './signup.effect';


export const signup$ = r.pipe(
  r.matchPath('/signup'),
  r.matchType('POST'),
  r.useEffect(signupEffect$)
);

// export const auth$ = combineRoutes('/auth', [login$]);
