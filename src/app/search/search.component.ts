import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { IAddAssociate } from '../model/add-associate';
import { SharedService } from '../shared.service';
import Chart from 'chart.js'
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
  //skillData : number[] = [10,20,30];
  constructor(private _searchService : SearchService,
    private _sharedService : SharedService,private _addAssociateService : AddAssociateService) { }

  ngOnInit() {
    this._searchService.viewAllAssociates()
    .subscribe(data => {
      this.associateData = data;
      this.candidatesRegistered = this.associateData.length;
      this.displaySkillGraph();
     // this.displaySkillGraph();
    });
    
  }

  displaySkillGraph(){
    debugger
    this.skillData = new Array<any>();
    for(var j=0; j < this.associateData.length ;j++){
    var index = 0;    
      for(var i = 0; i < this.associateData[j].associateSkills.length; i++){
       // if(j == 0){
        if(this.skillData.length === 0){
          this.skillData[index] ={
            data: [0],
            backgroundColor: "rgba(63,103,126,1)",
            hoverBackgroundColor: "rgba(50,90,100,1)"
          }
       // }        
      
        //for(var k = 0; k < this.skillData.length; k++){
          if(this.skillData[index].label === this.associateData[j].associateSkills[i].skillName){
            this.skillData[index].data[0] = this.skillData[index].data[0] + 1;
          } else {
            this.skillData[index].data[0] = this.skillData[index].data[0] + 1;
            this.skillData[index].label = this.associateData[j].associateSkills[i].skillName;
          }
       // }
      } 
      else{
        for(var k = 0; k < this.skillData.length; k++){
          this.skillData[this.skillData.length] ={
              data: [0],
              backgroundColor: "rgba(63,103,126,1)",
              hoverBackgroundColor: "rgba(50,90,100,1)"
          }
          if(this.skillData[k].label === this.associateData[j].associateSkills[i].skillName){
            this.skillData[k].data[0] = this.skillData[index].data[0] + 1;
          } else {
            this.skillData[index].data[0] = this.skillData[index].data[0] + 1;
            this.skillData[index].label = this.associateData[j].associateSkills[i].skillName;
          }
        }
      }
      index++;
    }          
    }
    console.log("this.skillData : " + JSON.stringify(this.skillData));
  }

  checkIfSkillsExist(associateSkill,skillInArray){
    if(skillInArray.label === associateSkill){

    }
  }

  dataset = this.skillData;

//   skillData = [{
//     data: [727],
//     backgroundColor: "rgba(63,103,126,1)",
//     hoverBackgroundColor: "rgba(50,90,100,1)"
// },{
//     data: [238],
//     backgroundColor: "rgba(163,103,126,1)",
//     hoverBackgroundColor: "rgba(140,85,100,1)"
// },{
//     data: [1238],
//     backgroundColor: "rgba(63,203,226,1)",
//     hoverBackgroundColor: "rgba(46,185,235,1)"
// }]

  chartcolor = [
    { 
    backgroundColor: 'rgba(30, 169, 224 , 0.8)'
    }
]

  chartOptions = {
	responsive: true,
    tooltips: {
        enabled: false
    },
    hover :{
        animationDuration:0
    },
    scales: {
        xAxes: [{
            ticks: {
                beginAtZero:true,
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:11
            },
            scaleLabel:{
                display:false
            },
            gridLines: {
				display:false
            }, 
            stacked: true
        }],
        yAxes: [{
            gridLines: {
                display:false,
                color: "#fff",
                zeroLineColor: "#fff",
                zeroLineWidth: 0
            },
            ticks: {
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:11
            },
            stacked: true
        }]
    },
    legend:{
        display:false
    },
    
    animation: {
        onComplete: function () {
            var chartInstance = this.chart;
            var ctx = chartInstance.ctx;
            ctx.textAlign = "left";
            ctx.font = "9px Open Sans";
            ctx.fillStyle = "#fff";

            Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                Chart.helpers.each(meta.data.forEach(function (bar, index) {
                    data = this.skillData.data[index];
                    if(i==0){
                        ctx.fillText(data, 50, bar._model.y+4);
                    } else {
                        ctx.fillText(data, bar._model.x-25, bar._model.y+4);
                    }
                }),this)
            }),this);
        }
    },
    pointLabelFontFamily : "Quadon Extra Bold",
    scaleFontFamily : "Quadon Extra Bold",
  };

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
