import { Injectable } from '@angular/core';
import { IAddAssociate} from './model/add-associate';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  associateIndex: number;
  associateData: IAddAssociate;
  readOnly: boolean;

  constructor() { }

  saveAssociateData(data){
    this.associateData = data;
  }

  fetchAssociateData():IAddAssociate{
    return this.associateData;
  }

  fetchAssociateIndex(){
    return this.associateIndex;
  }

  setReadOnly(readOnly){
    this.readOnly = readOnly;
  }

  getReadOnly(){
    return this.readOnly;
  }

}
