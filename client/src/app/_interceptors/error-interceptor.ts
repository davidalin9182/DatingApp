import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { toast } from 'ngx-sonner';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 400:
          if (error.error?.errors) {
            const modelStateErrors: string[] = [];

            for (const key in error.error.errors) {
              if (error.error.errors[key]) {
                modelStateErrors.push(...error.error.errors[key]);
              }
            }
            
            return throwError(() => modelStateErrors.flat());
          } else {
            toast.error('Bad Request', {
              description: error.error?.message || error.message
            });
          }
          break;

        case 401:
          toast.error('Unauthorized', {
            description: error.error/* ?.message || error.message */
          });
          break;

        case 404:
          router.navigateByUrl('/not-found');
          break;

        case 500: {
          const navigationExtras: NavigationExtras = {
            state: { error: error.error }
          };
          router.navigateByUrl('/server-error', navigationExtras);
          break;
        }

        default:
          toast.error('Unexpected Error', {
            description: error.error?.message || error.message
          });
          console.error(error);
          break;
      }

      return throwError(() => error);
    })
  );
};