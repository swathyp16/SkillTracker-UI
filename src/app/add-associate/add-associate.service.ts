import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class AddAssociateService {
  options: RequestOptions;
  headers: Headers;

  constructor(private _http: Http){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json, */*'); 
    this.options = new RequestOptions({ headers: this.headers });
  } 
  
  addAssociate(associateDetails,picture:File): Observable<any>{
    var params = JSON.stringify(associateDetails);
    let formData: FormData = new FormData();
    formData.append('file',picture);
    formData.append('data',params);  
    return this._http.post("http://localhost:8090/skillTracker/addAssociate",formData)
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  
  deleteAssociate(associateId): Observable<any>{
    return this._http.get("http://localhost:8090/skillTracker/deleteAssociate/"+associateId)
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  addSkillFromEditPage(skillData): Observable<any>{
    var params = JSON.stringify(skillData);
    return this._http.post("http://localhost:8090/skillTracker/addSkill",params,this.options)
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  extractData(res: Response) {
    let body = res;//.json();
    return body || {};
  }
  handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error || "Oops !! Something went wrong");
  } 
}
