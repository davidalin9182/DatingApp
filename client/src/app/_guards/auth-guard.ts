import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { toast } from 'ngx-sonner';
import { AccountService } from '../_services/account';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

   return accountService.currentUser$.pipe(
    take(1),
    map(user => {
      if (user) return true;

      toast.error('Unauthorized access. Please log in to continue.');
      router.navigateByUrl('/');
      return false;
    })
  );
};