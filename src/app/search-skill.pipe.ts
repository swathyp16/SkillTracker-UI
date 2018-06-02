import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchSkill'
})
export class SearchSkillPipe implements PipeTransform {

  transform(addedSkills: any, searchText?: any): any {
    if(searchText === undefined){
      return addedSkills;
    }

    return addedSkills.filter(function(data){
      return data.skillName.toLowerCase().includes(searchText.toLowerCase());
    });
  }
}
