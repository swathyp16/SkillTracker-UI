import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { IAddAssociate } from '../model/add-associate';
import { SharedService } from '../shared.service';
import { AddAssociateService } from '../add-associate/add-associate.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {
  associateData: IAddAssociate[];
  associatePic: File;
  deleteAssociateStatus : Response;
  successMessage: string;
  errorMessage: string;
  l1Candidates:number=0;
  l2Candidates:number=0;
  l3Candidates:number=0;
  l1CandidatePercentage:number=0;
  l2CandidatePercentage:number=0;
  l3CandidatePercentage:number=0;
  candidatesRegistered:number=0;
  femaleCandidatesReg:number=0;
  maleCandidatesReg:number=0;
  femaleCandidatesPercentage:number=0;
  maleCandidatesPercentage:number=0;
  skillData:Array<any>;
  constructor(private _searchService : SearchService,
    private _sharedService : SharedService,private _addAssociateService : AddAssociateService) { }

  ngOnInit() {
    this._searchService.viewAllAssociates()
    .subscribe(data => {
      this.associateData = data;
      this.candidatesRegistered = this.associateData.length;
      this.calculateCandidateDetails();
      this.displaySkillGraph();
    });
    
  }

  displaySkillGraph(){
    this.skillData.push()
  }

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // scales : {
    //     xAxes: [{
    //        ticks: {
    //           //steps : 10,
    //           stepValue : 200,
    //           //max : 2000,
    //         }
    //     }] 
    //   }
}

  calculateCandidateDetails(){
    for(var i=0; i<this.associateData.length;i++){
      if(this.associateData[i].level1 === true){
        this.l1Candidates++;
      } else if(this.associateData[i].level2 === true){
        this.l2Candidates++;
      } else if(this.associateData[i].level3 === true){
        this.l3Candidates++;
      }

      if(this.associateData[i].gender == "male"){
          this.maleCandidatesReg++;
      } else if(this.associateData[i].gender == "female"){
        this.femaleCandidatesReg++;
      }
    }
    this.l1CandidatePercentage = Math.round((this.l1Candidates/this.associateData.length)*100);
    this.l2CandidatePercentage = Math.round((this.l2Candidates/this.associateData.length)*100);
    this.l3CandidatePercentage = Math.round((this.l3Candidates/this.associateData.length)*100);
    this.maleCandidatesPercentage = Math.round((this.maleCandidatesReg/this.candidatesRegistered)*100);
    this.femaleCandidatesPercentage = Math.round((this.femaleCandidatesReg/this.candidatesRegistered)*100);
  }

  onDeleteBtnClick(associateData,index){
    this._addAssociateService.deleteAssociate(associateData.associateId)
    .subscribe(data =>{
      this.deleteAssociateStatus = data;
      if(this.deleteAssociateStatus.status == 200){
        this.successMessage = "Successfully deleted the Associate";
        this.associateData.splice(index,1);
      }
    },error =>{
      this.errorMessage = "Oops !! Something went wrong";
    });
  }

  onEdit(associateData,event){
    console.log("INSIDE EDIT FUNCTION : "+ JSON.stringify(associateData));
    this._sharedService.saveAssociateData(associateData);
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.value;
    if(idAttr == "View"){
        this._sharedService.setReadOnly(true);
      } else if(idAttr == "Edit"){
        this._sharedService.setReadOnly(null); 
      }
  }

   
}
