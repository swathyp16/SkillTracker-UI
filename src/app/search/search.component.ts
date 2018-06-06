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
  a : ISkillCount[] = [];
  
  chartData:Array<any> = [
    {
      label: 'SkillName',
      data: [0]
    }
];
  skillsData : Array<any> =  [
    {
      label: "HTML5",
      data: [3],
      backgroundColor: "#ABEBC6"
    },
    {
      label: "CSS3",
      data: [2],
      backgroundColor: "#16BEC1"
    },
    {
      label: "Java",
      data: [2],
      backgroundColor: "#16B5D1"
    },
    {
      label: "Spring",
      data: [2],
      backgroundColor: "#12ABC5"
    },
    {
      label: "Restful",
      data: [2],
      backgroundColor: "#0EA3DC"
    },
    {
      label: "Angular 1",
      data: [2],
      backgroundColor: "#0E90C1"
    },
    {
      label: "Angular 2",
      data: [2],
      backgroundColor: "#2A85D1"
    },
    {
      label: "React",
      data: [2],
      backgroundColor: "#1466AB"
    },
    {
      label: "Xml",
      data: [2],
      backgroundColor: "#3558F0"
    },
    {
      label: "JSON",
      data: [2],
      backgroundColor: "#1D3AB7"
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
    console.log("this.skillData : " + JSON.stringify(this.skillData));
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
       console.log("compressed[0] : "+ JSON.stringify(this.compressed[0]));
      this.skillsData =this.compressed[0];
      
      this.chart.chart.render();
}

public chartClicked(e:any):void {
  console.log(e);
}

// refresh_chart() {
//   setTimeout(() => {
//       //console.log(this.datasets_lines_copy);
//       //console.log(this.datasets_lines);
//       if (this.chart && this.chart.chart && this.chart.chart.config) {
//         for(var i =0 ;i<this.skillsData.length; i++){
//           this.chart.chart.config.data.labels = this.skillsData[i].label;
//           this.chart.chart.config.data.datasets.push(this.skillData[i].data[0]);
//         }          
//           this.chart.chart.update();
//       }
//   });
// }
 
//skillsData =  this.compressed[0];
// [
//     {
//       label: "HTML5",
//       data: [3],
//       backgroundColor: "#ff4000"
//     },
//     {
//       label: "Bootstrap",
//       data: [1],
//       backgroundColor: "#842245"
//     },
//     {
//       label: "XML",
//       data: [1],
//       backgroundColor: "#802955"
//     },
//     {
//       label: "JQuery",
//       data: [1],
//       backgroundColor: "#141187"
//     },
//     {
//       label: "PM",
//       data: [2],
//       backgroundColor: "#030923"
//     },
//     {
//       label:"GIT",
//       data:[1],
//       backgroundColor: "#678673"
//     },
//     {
//       label:"Hibernate",
//       data:[1],
//       backgroundColor:"#304575"
//     },
//     {
//       label:"SVN",
//       data:[1],
//       backgroundColor:"#350295"
//     }
//   ];

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
    legend:{
        display:false
    },
    
    // animation: {
    //     onComplete: function () {
    //         var chartInstance = this.chart;
    //         var ctx = chartInstance.ctx;
    //         ctx.textAlign = "left";
    //         ctx.font = "9px Open Sans";
    //         ctx.fillStyle = "#fff";

    //         Chart.helpers.each(this.chartData.forEach(function (dataset, i) {
    //             var meta = chartInstance.controller.getDatasetMeta(i);
    //             Chart.helpers.each(meta.data.forEach(function (bar, index) {
    //                 let data = this.chartData.data[index];
    //                 if(i==0){
    //                     ctx.fillText(data, 50, bar._model.y+4);
    //                 } else {
    //                     ctx.fillText(data, bar._model.x-25, bar._model.y+4);
    //                 }
    //             }),this)
    //         }),this);
    //     }
    // },
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
    console.log("this.maleCandidatesReg : "+ this.maleCandidatesReg);
    this.maleCandidatesPercentage = Math.round((this.maleCandidatesReg/this.candidatesRegistered)*100);
    console.log("this.maleCandidatesPercentage : "+ this.maleCandidatesPercentage);
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
