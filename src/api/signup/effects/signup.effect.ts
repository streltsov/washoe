import { HttpError, HttpStatus, HttpEffect, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { throwError } from 'rxjs';
import {tap, map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { UserModel as User } from '../../users/model/users.dao';

const validator$ = requestValidator$({
  body: t.type({
    email: t.string,
    password: t.string
  })
});

export const signupEffect$: HttpEffect = req$ =>
   req$.pipe(
      use(validator$),
      map(({ body }) =>  body),
      switchMap(user => User.create(user)),
      map(response => ({ body: response })),
      catchError(() => throwError(
         new HttpError('Bad Request', HttpStatus.BAD_REQUEST)
      )),
)
