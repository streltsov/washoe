import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { r, HttpStatus, HttpError } from '@marblejs/core';
import { generateToken } from '@marblejs/middleware-jwt';
import { findUserByCredentials } from '../queries';
import { throwError, of } from 'rxjs';

const neverEmpty = data =>
  data.length ? data : throwError(new Error());

export const login$ = r.pipe(
  r.matchPath('/login'),
  r.matchType('POST'),
  r.useEffect(req$ => req$.pipe(
    map(res => res.body),
    mergeMap(findUserByCredentials),
    map(neverEmpty),
    map(res => res[0]),
    map(({ email, id}) => ({ email, id })),
    map(generateToken({ secret: process.env.SECRETKEY })),
    map(token => ({ body: { token } })),
    catchError(() => throwError( new HttpError('Unauthorized', HttpStatus.UNAUTHORIZED))),
  )));
