import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from './search.service';
import { IAddAssociate } from '../model/add-associate';
import { ISkillCount } from '../model/skill-occurance'
import { SharedService } from '../shared.service';
import Chart from 'chart.js';
import { AddAssociateService } from '../add-associate/add-associate.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {
  @ViewChild("baseChart")
  public chart: BaseChartDirective;
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
  femaleRatedCandidates: number = 0;
  maleRatedCandidates: number = 0;
  ratedCandidates: number = 0;
  freshersCandidates: number = 0;
  a : ISkillCount[] = [];
  
  chartData:Array<any> = [
    {
      label: 'SkillName',
      data: [0]
    }
];
  skillsData : Array<any> =  [
    {
      label: "HTML",
      data: [0],
      backgroundColor: "#ABEBC6"
    },
    {
      label: "CSS3",
      data: [0],
      backgroundColor: "#16BEC1"
    },
    {
      label: "Java",
      data: [0],
      backgroundColor: "#16B5D1"
    },
    {
      label: "Spring",
      data: [0],
      backgroundColor: "#12ABC5"
    },
    {
      label: "Restful",
      data: [0],
      backgroundColor: "#0EA3DC"
    },
    {
      label: "Angular 1",
      data: [0],
      backgroundColor: "#0E90C1"
    },
    {
      label: "angular 2",
      data: [0],
      backgroundColor: "#2A85D1"
    },
    {
      label: "React",
      data: [0],
      backgroundColor: "#1466AB"
    },
    {
      label: "xml",
      data: [0],
      backgroundColor: "#3558F0"
    },
    {
      label: "Json",
      data: [0],
      backgroundColor: "#1D3AB7"
    },
    {
      label: "PM",
      data: [0],
      backgroundColor: "#0A2B95"
    },
    {
      label: "Scrum",
      data: [0],
      backgroundColor: "#5015C6"
    },
    {
      label: "Bootstrap",
      data: [0],
      backgroundColor: "#25F5C0"
    }
  ];
  compressed = [];
  constructor(private _searchService : SearchService,
    private _sharedService : SharedService,private _addAssociateService : AddAssociateService) { }

  ngOnInit() {
    this._searchService.viewAllAssociates()
    .subscribe(data => {
      this.associateData = data;
      this.candidatesRegistered = this.associateData.length;
      this.displaySkillGraph();
      this.calculateCandidateDetails();
    });
    
  }

  displaySkillGraph(){
    this.skillData = new Array<any>();
    for(var j=0; j < this.associateData.length ;j++){
      for(var i = 0; i < this.associateData[j].associateSkills.length; i++){
       this.skillData.push(this.associateData[j].associateSkills[i].skillName);
      }                   
    }   
    this.calculateSkillsPercentage();
  }

  calculateSkillsPercentage(){
       var index = 0;
       var copy = this.skillData.slice(0);
       for (var i = 0; i < this.skillData.length; i++) {      
         var myCount = 0;	
         for (var w = 0; w < copy.length; w++) {
           if (this.skillData[i] == copy[w]) {
             myCount++;
             delete copy[w];
           }
         }
      
         if (myCount > 0) {
         this.a[i] = {
              label : "",
              data:[0],
              backgroundColor:""
          }
           this.a[i].label = this.skillData[i];
           this.a[i].data[0] = myCount;
           this.a[i].backgroundColor = '#' + Math.random().toString(16).slice(2, 8);
           this.compressed.push(this.a);
           index++;
         }
       }
      
      for(var j = 0; j < this.skillsData.length; j++){
        var flag = 0;
        for(var k = 0; k < this.compressed[0].length; k++){
          if(this.compressed[0][k] !== null && this.compressed[0][k] !== undefined){
            if(this.skillsData[j].label.toLowerCase() === this.compressed[0][k].label.toLowerCase()){
              this.skillsData[j].data[0] = this.compressed[0][k].data[0];
              flag = flag + 1;
              break;
            }
          }          
        }
        if(flag == 0){
          this.skillsData.splice(j,1);
        } 
      }  
      this.chart.chart.update();
}

public chartClicked(e:any):void {
  console.log(e);
}

chartColor = [
  { 
  backgroundColor: "#3DECE3"
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
    pointLabelFontFamily : "Quadon Extra Bold",
    scaleFontFamily : "Quadon Extra Bold",
  };

  calculateCandidateDetails(){
    var female = 0;
    var male = 0;
    var ratedMale = 0;
    var ratedFemale = 0;
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
          if (this.associateData[i].statusRed === true) {
            this.ratedCandidates++;
            ratedMale++;
          }
      } else if(this.associateData[i].gender == "female"){
        this.femaleCandidatesReg++;
        if (this.associateData[i].statusRed === true) {
          this.ratedCandidates++;
          ratedFemale++;
        }
      }
    }
    this.l1CandidatePercentage = Math.round((this.l1Candidates/this.candidatesRegistered)*100);
    this.l2CandidatePercentage = Math.round((this.l2Candidates/this.candidatesRegistered)*100);
    this.l3CandidatePercentage = Math.round((this.l3Candidates/this.candidatesRegistered)*100);
    this.maleCandidatesPercentage = Math.round((this.maleCandidatesReg/this.candidatesRegistered)*100);
    this.femaleCandidatesPercentage = Math.round((this.femaleCandidatesReg/this.candidatesRegistered)*100);
    if(ratedFemale > 0){
      this.femaleRatedCandidates = (ratedFemale/this.ratedCandidates)*100;
      this.femaleRatedCandidates = Math.round(this.femaleRatedCandidates * 100) / 100;
    } 
    if(ratedMale > 0){
    this.maleRatedCandidates = (ratedMale/this.ratedCandidates)*100;
    this.maleRatedCandidates = Math.round(this.maleRatedCandidates * 100) / 100;
    }
    this.freshersCandidates = (this.l1Candidates/this.candidatesRegistered)*100;
    this.freshersCandidates = Math.round(this.freshersCandidates * 100) / 100;
  }

  onDeleteBtnClick(data,index){
    this._addAssociateService.deleteAssociate(data.associateId)
    .subscribe(data =>{
      this.deleteAssociateStatus = data;
      if(this.deleteAssociateStatus.status == 200){
        this.successMessage = "Successfully deleted the Associate";
        this.associateData.splice(index,1);
        this.associateData = Object.assign([],this.associateData);
      }
    },error =>{
      this.errorMessage = "Oops !! Something went wrong";
    });
  }

  onEdit(associateData,event){
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
