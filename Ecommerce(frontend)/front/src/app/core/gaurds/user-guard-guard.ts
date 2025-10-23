import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../service/auth-services';

//function 
export const userGuard: CanActivateFn = (route, state) => {
  const _auth = inject(Auth);
  const _router= inject(Router);
  if(_auth.isloggedinWithRole('user')){ return true}
  else{
    _router.navigate(['/login'])
    return false;
  }
};
