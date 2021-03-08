import { Injectable } from '@angular/core';
import { Resolve , ActivatedRouteSnapshot , RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { AdminServiceService } from "../../admin-service.service";

@Injectable({
  providedIn: 'root'
})
export class ParticipantsResolverService implements Resolve<any> {

  constructor(private _service: AdminServiceService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> | Promise<any> | any {
    //console.log("params.get('id')" , route.paramMap.get('id'));
    let temp = {eventId: route.paramMap.get('id')};
    return this._service.getEventBatches(temp);
  }
}
