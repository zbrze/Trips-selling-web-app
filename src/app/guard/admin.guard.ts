import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    public service: AuthService,
    public router: Router
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.service.user$.pipe(
        take(1),
        map(user => user && (user.role.admin ? true : false || user.role.editor ? true : false  ) ),
        tap(isAdmin => {
          if (!isAdmin) {
            console.error('Access denied - Admins only')
          }
        })
      );
    }
  
}
