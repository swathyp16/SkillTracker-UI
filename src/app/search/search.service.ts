import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { IAddAssociate } from '../model/add-associate';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  options: RequestOptions;
  headers: Headers;

  constructor(private _http: Http){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');  
    this.headers.append('Accept', 'application/json, */*'); 
    this.options = new RequestOptions({ headers: this.headers });
  }

  viewAllAssociates(): Observable<IAddAssociate[]>{
    return this._http.get("http://localhost:8090/viewAllAssociates",this.options)
    .map((response: Response) =>  response.json())
    .catch(this.handleErrorObservable);
  }

  // deleteAssociate(associateId):Observable<any>{
  //   var params = JSON.stringify(associateId);
  //   return this._http.get("http://localhost:8090/deleteAssociate",params,this.options)
  //   .map(this.extractData)
  //   .catch(this.handleErrorObservable);
  // }

  extractData(res: Response) {
    let body = res;//.json();
    return body || {};
  }
  handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error || "Oops !! Something went wrong");
  } 
}
