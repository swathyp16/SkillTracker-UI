import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import {IAddAssociate } from '../model/add-associate';
import { IAddSkills } from '../model/add-skill';
import { AddAssociateService } from '../add-associate/add-associate.service';
import { NgForm } from '@angular/forms';
import { AddSkillService } from '../add-skill/add-skill.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit-associate',
  templateUrl: './edit-associate.component.html',
  styleUrls: ['./edit-associate.component.css']
})
export class EditAssociateComponent implements OnInit {
  associateData:IAddAssociate;
  selectedFiles: FileList;
  addedSkills : IAddSkills[];
  skillToAdd : IAddSkills;
  associateDetails : IAddAssociate = new IAddAssociate();
  redStatusClicked: boolean = null;
  greenStatusClicked: boolean = null;
  blueStatusClicked: boolean = null;
  L1Clicked: boolean = null;
  L2Clicked: boolean = null;
  L3Clicked: boolean = null;
  addAssociateResponse: Response;
  deleteAssociateResponse: Response;
  addSkillResponse: Response;
  successMessage: string;
  errorMessage: string;
  picture: File;
  readOnlyFlag: boolean;
  constructor(private _sharedService : SharedService,
  private _addAssociateService:AddAssociateService,private _addSkillService: AddSkillService,
  private route: ActivatedRoute,
  private router: Router) { }

  ngOnInit() {
    this.readOnlyFlag = this._sharedService.getReadOnly();
    this.associateData = this._sharedService.fetchAssociateData();
    this._addSkillService.viewAllSkills()
    .subscribe(data => {
      this.addedSkills = data; 
      this.mapSkillRating(); 
    });
    
  }
  mapSkillRating(){
    //debugger
    for(var i=0; i<this.addedSkills.length; i++){
      this.addedSkills[i].skillRating = 0;
      for(var j=0; j<this.associateData.associateSkills.length; j++){
        if(this.addedSkills[i].skillId == this.associateData.associateSkills[j].skillId){
          this.addedSkills[i].skillRating = this.associateData.associateSkills[j].skillRating;
        }
      }     
    }
  }


  selectFile(event){
    this.selectedFiles = event.target.files;
  }

  selectedSkillRating(skillRating,index){
    this.addedSkills[index].skillRating = skillRating;
  }

  onCancelBtnClick(){
    this.router.navigate(['/searchAssociate']);
  }

  onDeleteBtnClick(associateId){
    this._addAssociateService.deleteAssociate(associateId).subscribe(data => {
      this.deleteAssociateResponse = data;
      if(this.deleteAssociateResponse.status == 200){
        this.successMessage = "Successfully added the Associate";
      }
    }, error =>{
        this.errorMessage = "Oops !! Something went wrong";
    });;
  }

  onAddSkillClick(addSkill){
    this.skillToAdd = new IAddSkills();
    this.skillToAdd.skillName = addSkill;
    console.log("addSkill: " + JSON.stringify(this.skillToAdd));
    this._addAssociateService.addSkillFromEditPage(this.skillToAdd).subscribe(data => {
      this.addSkillResponse = data;
      if(this.addSkillResponse.status == 200){
        this.successMessage = "Successfully added the Skill";
        this.addedSkills.splice( this.addedSkills.length, 0, this.skillToAdd);
      }
    }, error =>{
        this.errorMessage = "Oops !! Something went wrong";
    });;
  }

  statusGreenOnClick(){
    this.redStatusClicked = true;
    this.blueStatusClicked = true;
    this.greenStatusClicked = undefined ;
    this.associateDetails.statusGreen = true;
  }

  statusBlueOnClick(){
    this.redStatusClicked = true;
    this.greenStatusClicked = true;
    this.blueStatusClicked = undefined;
    this.associateDetails.statusBlue = true;
  }

  statusRedOnClick(){
    this.blueStatusClicked = true;
    this.greenStatusClicked = true;
    this.redStatusClicked = undefined;
    this.associateDetails.statusRed = true;
  }

  level1OnClick(){
    this.L2Clicked = true;
    this.L3Clicked = true;
    this.L1Clicked = undefined ;
    this.associateDetails.level1 = true;
  }

  level2OnClick(){
    this.L2Clicked = undefined;
    this.L3Clicked = true;
    this.L1Clicked = true ;
    this.associateDetails.level2 = true;
  }

  level3OnClick(){
    this.L2Clicked = true;
    this.L3Clicked = undefined;
    this.L1Clicked = true ;
    this.associateDetails.level3 = true;
  }

  editAssociate(editAssociateForm : NgForm) : void{
    console.log("editAssociateForm : "+ JSON.stringify(editAssociateForm.value));
    this.associateDetails.name = editAssociateForm.value.associateName;
    this.associateDetails.associateId = editAssociateForm.value.associateId;
    this.associateDetails.email = editAssociateForm.value.email;
    this.associateDetails.mobileNum = editAssociateForm.value.mobile;
    this.associateDetails.remark = editAssociateForm.value.remarks;
    for(var i= 0 ; i < this.addedSkills.length ; i++){
      if(this.addedSkills[i].skillRating !== null && this.addedSkills[i].skillRating !== 0 ){
        this.associateDetails.associateSkills.push(this.addedSkills[i]);
      }      
    }  
    this.associateDetails.otherSkill = editAssociateForm.value.otherSkill;
    this.associateDetails.strength = editAssociateForm.value.strength;
    this.associateDetails.weakness = editAssociateForm.value.weakness;
    this.picture = this.selectedFiles.item(0);
    console.log("associateDetails : " + JSON.stringify(this.associateDetails));
    this._addAssociateService.addAssociate(this.associateDetails,this.picture)
    .subscribe(data => {
      this.addAssociateResponse = data;
      if(this.addAssociateResponse.status == 200){
        this.successMessage = "Successfully added the Associate";
      }
    }, error =>{
        this.errorMessage = "Oops !! Something went wrong";
    });
  }


}
