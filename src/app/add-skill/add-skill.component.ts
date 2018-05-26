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
  constructor(private _addSkillService: AddSkillService) { }

  ngOnInit() {
    this._addSkillService.viewAllSkills()
    .subscribe(data => {
      this.addedSkills = data; 
      console.log("addedSkills : "+ this.addedSkills);
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

}
