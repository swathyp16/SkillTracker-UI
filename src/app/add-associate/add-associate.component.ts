import { Component, OnInit } from '@angular/core';
import { AddSkillService } from '../add-skill/add-skill.service';
import { IAddSkills } from '../model/add-skill';
import { IAddAssociate } from '../model/add-associate';
import { NgForm } from '@angular/forms';
import { AddAssociateService } from './add-associate.service';

@Component({
  selector: 'app-add-associate',
  templateUrl: './add-associate.component.html',
  styleUrls: ['./add-associate.component.css'],
  providers: [AddSkillService]
})
export class AddAssociateComponent implements OnInit {
  addedSkills : IAddSkills[];
  associateDetails : IAddAssociate = new IAddAssociate();
  addAssociateResponse: Response;
  successMessage: string;
  errorMessage: string;
  selectedFiles: FileList;
  picture: File;
  redStatusClicked: boolean = null;
  greenStatusClicked: boolean = null;
  blueStatusClicked: boolean = null;
  L1Clicked: boolean = null;
  L2Clicked: boolean = null;
  L3Clicked: boolean = null;
  constructor(private _addSkillService: AddSkillService,
  private _addAssociateService: AddAssociateService) { }

  ngOnInit() {
    this._addSkillService.viewAllSkills()
    .subscribe(data => {
      this.addedSkills = data;  
    });
  }

  addAssociate(addAssociateForm : NgForm) : void{
    //console.log("addAssociateForm : "+ JSON.stringify(addAssociateForm.value));
    this.associateDetails.name = addAssociateForm.value.associateName;
    this.associateDetails.associateId = addAssociateForm.value.associateId;
    this.associateDetails.email = addAssociateForm.value.email;
    this.associateDetails.mobileNum = addAssociateForm.value.mobile;
    this.associateDetails.remark = addAssociateForm.value.remarks;
    for(var i= 0 ; i < this.addedSkills.length ; i++){
      this.associateDetails.associateSkills.push(this.addedSkills[i]);
    }  
    this.associateDetails.otherSkill = addAssociateForm.value.otherSkill;
    this.associateDetails.strength = addAssociateForm.value.strength;
    this.associateDetails.weakness = addAssociateForm.value.weakness;
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

  selectedSkillRating(skillRating,index){
    console.log("skillRating: "+ skillRating);
    this.addedSkills[index].skillRating = skillRating;
    console.log("addedSkills: "+ JSON.stringify(this.addedSkills));
  }

  selectFile(event){
    debugger
    this.selectedFiles = event.target.files;
  }

  statusGreenOnClick(){
    this.redStatusClicked = true;
    this.blueStatusClicked = true;
    this.greenStatusClicked = undefined ;
  }

  statusBlueOnClick(){
    this.redStatusClicked = true;
    this.greenStatusClicked = true;
    this.blueStatusClicked = undefined;
  }

  statusRedOnClick(){
    this.blueStatusClicked = true;
    this.greenStatusClicked = true;
    this.redStatusClicked = undefined;
  }

  level1OnClick(){
    this.L2Clicked = true;
    this.L3Clicked = true;
    this.L1Clicked = undefined ;
  }

  level2OnClick(){
    this.L2Clicked = undefined;
    this.L3Clicked = true;
    this.L1Clicked = true ;
  }

  level3OnClick(){
    this.L2Clicked = true;
    this.L3Clicked = undefined;
    this.L1Clicked = true ;
  }

}