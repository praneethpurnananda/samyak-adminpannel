import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminServiceService } from './admin-service.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AdminServiceService, private router: Router){}

 async canActivate(){
   if(localStorage.getItem('token')){
    let c = {collection: 'Users', permission: 'view'};
    const tmp = await this.authService.userPageAccess(c).toPromise();
    console.log(tmp);
    if(tmp){
      return true
    }
    else{
      this.router.navigate(['/']);
      return false
    }
  }
  else{
    this.router.navigate(['/']);
    return false
  }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EventAuthGuard implements CanActivate {
  constructor(private authService: AdminServiceService, private router: Router){}

  async canActivate(){
    if(localStorage.getItem('token')){
     let c = {collection: 'Events', permission: 'view'};
     const tmp = await this.authService.userPageAccess(c).toPromise();
     console.log(tmp);
     if(tmp){
       return true
     }
     else{
       this.router.navigate(['/']);
       return false
     }
   }
   else{
     this.router.navigate(['/']);
     return false
   }
   }
}
