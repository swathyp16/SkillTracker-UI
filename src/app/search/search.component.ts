import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { IAddAssociate } from '../model/add-associate';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {
  associateData: IAddAssociate[];
  associatePic: File;
  constructor(private _searchService : SearchService) { }

  ngOnInit() {
    this._searchService.viewAssociatePic()
    .subscribe(data => {
      this.associatePic = data;
    });
    this._searchService.viewAllAssociates()
    .subscribe(data => {
      this.associateData = data;
    });
  }

}
