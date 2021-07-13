import { HttpError, HttpStatus, HttpEffect, use, r } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { UserModel as User } from '../../users/model/users.dao';
import { map, switchMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const validator$ = requestValidator$({
  body: t.type({
    email: t.string,
    password: t.string
  })
});

const signupEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(validator$),
    map(({ body }) => body),
    switchMap(user => User.create(user)),
    map(response => ({ body: response })),
    catchError(() => throwError(
      new HttpError('Bad Request', HttpStatus.BAD_REQUEST)
    )),
  )

export const signup$ = r.pipe(
  r.matchPath('/signup'),
  r.matchType('POST'),
  r.useEffect(signupEffect$)
);