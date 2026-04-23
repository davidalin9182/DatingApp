import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { take } from 'rxjs/internal/operators/take';
import { AccountService } from '../_services/account';
import { switchMap } from 'rxjs/internal/operators/switchMap';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);

  return accountService.currentUser$.pipe(
    take(1),
    switchMap(user => {
      if (user) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${user.token}`
          }
        });
      }

      return next(req);
    })
  );
};
