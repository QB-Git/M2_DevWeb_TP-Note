import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ListPersonnelService, Music} from "../service/list-personnel.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeDetailResolverResolver implements Resolve<Music> {

  constructor(private readonly peopleService: ListPersonnelService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Music> {
    const employeId: string | null = route.paramMap.get('id');
    if(employeId != null){
      return this.peopleService.fetchOne(employeId);
    }
    else
      return new Observable<Music>();
  }
}
