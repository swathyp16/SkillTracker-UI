import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddSkillService } from './add-skill.service';
import { IAddSkills } from '../model/add-skill';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css'],
  providers: [AddSkillService]
})
export class AddSkillComponent implements OnInit {
  addSkillResponse: Response;
  addedSkills : IAddSkills[];
  successMessage: string;
  errorMessage: string;
  deleteSkillStatus : Response;
  isEditBtnClicked:boolean = false;
  skillName: string;
  addSkill: Response;
  editSkillData:IAddSkills;
  constructor(private _addSkillService: AddSkillService) { }

  ngOnInit() {
    this._addSkillService.viewAllSkills()
    .subscribe(data => {
      this.addedSkills = data; 
      console.log("addedSkills : "+ JSON.stringify(this.addedSkills));
    });
  }

  addSkills(addSkillForm : NgForm):void{
    this._addSkillService.addSkill(addSkillForm)
    .subscribe(data =>{
        this.addSkillResponse = data;
        if(this.addSkillResponse.status == 200){
          this.successMessage = "Successfully added the Skill";
          this.addedSkills.splice( 1, 0, addSkillForm.value);
        }
      },error =>{
        this.errorMessage = "Oops !! Something went wrong";
      }
    );        
  }

  deleteSkill(skill,index){
    this._addSkillService.deleteSkill(skill)
    .subscribe(data =>{
      this.deleteSkillStatus = data;
      if(this.deleteSkillStatus.status == 200){
        this.successMessage = "Successfully deleted the Skill";
        this.addedSkills.splice(index,1);
      }
    },error =>{
      this.errorMessage = "Oops !! Something went wrong";
    });
  }

  editSkill(skillId,skillName,event,index){
    console.log("skillId : "+ skillId + "skillName : " +skillName);
    var target = event.target || event.srcElement || event.currentTarget;
    var idValue = target.value;
    if(idValue == "Edit"){
      this.isEditBtnClicked = true;
      target.value = "Save";
      target.className="btn btn-success";
      for(var i= 0 ; i < this.addedSkills.length;i++){
       if(this.addedSkills[i].skillName == skillName){
         this.addedSkills[i].isEdit = true;
       }
     }
   }else{
     this.isEditBtnClicked = false;
     target.value = "Edit";
     target.className="btn btn-info";
     for(var i= 0 ; i < this.addedSkills.length;i++){
       if(this.addedSkills[i].skillName == skillName){
         this.addedSkills[i].isEdit = false;
       }
     }
     for(var i=0; i<target.form.length ; i++){
       if(target.form[i].id.includes("skill-") && index==target.form[i].id.substring(6,7)){
         this.skillName = target.form[i].value;
       }        
     }
     //skill.skillName = this.skillName;
    // skill.skillId = 
    this.editSkillData = new IAddSkills();
    this.editSkillData.skillId = skillId;
    this.editSkillData.skillName = this.skillName;
     this._addSkillService.editSkill(this.editSkillData)
     .subscribe(data =>{
         this.addSkill = data;
         if(this.addSkill.status == 200){
           this.successMessage = "Successfully edited the Skill";
         }
       },error =>{
         this.errorMessage = "Oops !! Something went wrong";
       }
     );  
   }
  }

}
