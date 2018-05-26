import { Component, OnInit } from '@angular/core';
import { AddSkillService } from '../add-skill/add-skill.service';
import { IAddSkills } from '../model/add-skill';

@Component({
  selector: 'app-add-associate',
  templateUrl: './add-associate.component.html',
  styleUrls: ['./add-associate.component.css'],
  providers: [AddSkillService]
})
export class AddAssociateComponent implements OnInit {
  addedSkills : IAddSkills[];
  constructor(private _addSkillService: AddSkillService) { }

  ngOnInit() {
    this._addSkillService.viewAllSkills()
    .subscribe(data => {
      this.addedSkills = data; 
      console.log("addedSkills : "+ this.addedSkills);
    });
  }

}
