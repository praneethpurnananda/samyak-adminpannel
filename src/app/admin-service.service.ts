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

  forgotPassword(body: any){
    return this._http.post(this.backendService+'/users/forgot-password', body,{
        observe: 'body'
    });
  }

  //permissions
  userPageAccess(body: any){
    console.log(body);
    return this._http.post(this.backendService+'/roles/check-permission', body ,{
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
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

  userRoles():Observable<object>{
    return this._http.get(this.backendService+'/roles/all-UserRoles', {
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  addUserRole(body: any){
    return this._http.post(this.backendService+'/roles/add-UserRole', body, {
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  deleteUserRole(body: any){
    return this._http.post(this.backendService+'/roles/delete-UserRole', body, {
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  addEventType(body: any){
    return this._http.post(this.backendService+'/events/add-eventType', body, {
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  viewEventTypes():Observable<object>{
    return this._http.get(this.backendService+'/events/all-eventTypes', {
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  addEvent(body: any){
    return this._http.post(this.backendService+'/events/add-event', body, {
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  allEvents():Observable<object>{
    return this._http.get(this.backendService+'/events/all-events', {
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  uploadEventCsv(body: any){
    console.log(body);
    return this._http.post(this.backendService+'/events/add-csvEvents', body, {
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  editEvent(body: any){
      return this._http.post(this.backendService+'/events/edit-event', body, {
        observe: 'body',
        headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
      });
  }

  deleteEvent(body: any){
    return this._http.post(this.backendService+'/events/delete-event', body, {
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  addEventBatch(body: any){
    return this._http.post(this.backendService+'/slots/add', body, {
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  getEventBatches(body: any){
    console.log('in service');
    return this._http.post(this.backendService+'/slots/all-slots', body, {
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  deleteBatch(body: any){
    return this._http.post(this.backendService+'/slots/delete', body, {
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  getEventParticipantsList(id):Observable<object>{
    return this._http.get(this.backendService+'/register/event-registrations', {
      params: new HttpParams().append('eventId', id),
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  addParticipantsSlots(body: any){
    return this._http.post(this.backendService+'/slots/assign-batch', body, {
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  deleteParticipantSlot(body: any){
    return this._http.post(this.backendService+'/slots/remove-user', body, {
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  paymentsData():Observable<object>{
    return this._http.get(this.backendService+'/payments/all-payments', {
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  singleUserPaymentData(id):Observable<object>{
    return this._http.get(this.backendService+'/payments/payments/'+id, {
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  addTechTalk(body: any){
    return this._http.post(this.backendService+'/techtalks/add-talk', body, {
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  uploadTechTalkCsv(body: any){
    console.log(body);
    return this._http.post(this.backendService+'/techtalks/add-csvTalks', body, {
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  displayTechTalks():Observable<object>{
    return this._http.get(this.backendService+'/techtalks/all-talks', {
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  addDepartment(body: any){
    return this._http.post(this.backendService+'/events/add-department', body, {
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  getDepartments():Observable<object>{
    console.log('in service');
    return this._http.get(this.backendService+'/events/all-departments' ,{
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  deleteDepartment(body: any){
    return this._http.post(this.backendService+'/events/delete-department', body, {
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  editDepartment(body: any){
    return this._http.post(this.backendService+'/events/edit-department', body, {
      observe: 'body',
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }


  //getdashboard-data

  getDashboardUserDetails():Observable<object>{
    return this._http.get(this.backendService+'/administration/users-details' ,{
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }

  getDashboardPaymentDetails():Observable<object>{
    return this._http.get(this.backendService+'/administration/payment-details' ,{
      headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
    });
  }



}
