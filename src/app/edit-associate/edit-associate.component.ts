import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import {IAddAssociate } from '../model/add-associate';

@Component({
  selector: 'app-edit-associate',
  templateUrl: './edit-associate.component.html',
  styleUrls: ['./edit-associate.component.css']
})
export class EditAssociateComponent implements OnInit {
  associateData:IAddAssociate;
  constructor(private _sharedService : SharedService) { }

  ngOnInit() {
    this.associateData = this._sharedService.fetchAssociateData();
    console.log("AssociateData in shared service : "+ JSON.stringify(this.associateData));
  }

}
