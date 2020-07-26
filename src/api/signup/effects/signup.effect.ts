import { map, mergeMap, catchError } from 'rxjs/operators';
import { r, HttpStatus, HttpError } from '@marblejs/core';
import { generateToken } from '@marblejs/middleware-jwt';
import { findByCredentials } from './findByCredentials';
import { throwError } from 'rxjs';

export const generateTokenPayload = user => ({
  id: user.id,
  email: user.email,
});

export const signup$ = r.pipe(
  r.matchPath('/signup'),
  r.matchType('POST'),
  r.useEffect(req$ => req$.pipe(
    map(req => req.body),
    mergeMap(findByCredentials),
    map(generateTokenPayload),
//    map(generateToken({ secret: Config.jwt.secret })),
    map(generateToken({ secret: 'Helluva' })),
    map(token => ({ body: { token } })),
    catchError(() => throwError(
      new HttpError('Unauthorized', HttpStatus.UNAUTHORIZED)
    )),
  )));
