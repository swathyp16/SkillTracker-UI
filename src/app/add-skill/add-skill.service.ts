import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { IAddSkills } from '../model/add-skill';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddSkillService {
  options: RequestOptions;
  headers: Headers;

  constructor(private _http: Http){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');  
    this.headers.append('Accept', 'application/json, */*'); 
    this.options = new RequestOptions({ headers: this.headers });
  } 
  
  addSkill(addSkillForm : NgForm): Observable<any>{
    var params = JSON.stringify(addSkillForm.value);
    return this._http.post("http://localhost:8090/addSkill",params,this.options)
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  viewAllSkills(): Observable<IAddSkills[]>{
    return this._http.get("http://localhost:8090/viewAllSkills",this.options)
    .map((response: Response) =>  response.json())
    .catch(this.handleErrorObservable);
  }

  deleteSkill(skill):Observable<any>{
    var params = JSON.stringify(skill);
    return this._http.post("http://localhost:8090/deleteSkill",params,this.options)
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  editSkill(editSkillData):Observable<any>{
    var params = JSON.stringify(editSkillData);
    return this._http.post("http://localhost:8090/addSkill",params,this.options)
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
