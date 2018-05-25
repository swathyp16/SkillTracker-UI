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
  constructor(private _addSkillService: AddSkillService) { }

  ngOnInit() {
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

}
