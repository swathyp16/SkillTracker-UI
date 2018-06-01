import { Injectable } from '@angular/core';
import { IAddAssociate} from './model/add-associate';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  associateIndex: number;
  associateData: IAddAssociate;

  constructor() { }

  saveAssociateData(data){
    this.associateData = data;
    //this.associateIndex = index;
  }

  fetchAssociateData():IAddAssociate{
    return this.associateData;
  }

  fetchAssociateIndex(){
    return this.associateIndex;
  }

}
