import { Injectable } from '@angular/core';
import { HttpClient , HttpParams , HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  backendService = environment.backendService;

  constructor(private _http: HttpClient) { }

  login(body: any){
      return this._http.post(this.backendService+'/administration/login', body,{
          observe: 'body'
      });
  }

  getAllUsers():Observable<object>{
    return this._http.get(this.backendService+'/administration/all-users', {
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  editUser(body: any){
    // console.log(body);
    return this._http.post(this.backendService+'/administration/edit-user', body,{
        observe: 'body',
        headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  deleteUser(body: any){
    return this._http.post(this.backendService+'/administration/delete-user', body,{
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token')),
      // params: new HttpParams().append('userId', id)
    });
  }

  disableUser(body: any){
    return this._http.post(this.backendService+'/administration/account-status', body,{
        observe: 'body',
        headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  getRoles():Observable<object>{
    return this._http.get(this.backendService+'/roles/all-roles', {
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  addRole(body: any){
    // console.log("called");
    return this._http.post(this.backendService+'/roles/add-role', body,{
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  deleteRole(body: any){
    return this._http.post(this.backendService+'/roles/delete-role', body, {
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token')),
      // params: new HttpParams().append('RoleId', id)
    });
  }

  editRole(body: any){
    return this._http.post(this.backendService+'/roles/edit-role', body, {
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  setPermissions(body: any){
    return this._http.post(this.backendService+'/roles/manage-permissions', body, {
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

}
