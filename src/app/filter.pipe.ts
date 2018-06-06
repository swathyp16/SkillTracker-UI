import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


 transform(associateData: any, filter: any, searchByName?: any,searchByAssociateId?:any,searchByEmail?:any,searchByMobile?:any,searchByStrongskills?:any): any {
   
    if (associateData && associateData.length){
      return associateData.filter(data =>{
          let flag = 0;
          let skillString = '';
          for(var i = 0; i < data.associateSkills.length; i++){
            if(skillString == ''){
              skillString = data.associateSkills[i].skillName;
            } else{
              skillString = skillString+","+data.associateSkills[i].skillName;
            }            
          }
          if (searchByName && data.name.toLowerCase().indexOf(searchByName.toLowerCase()) === -1){
              return false;
          }
          if (searchByAssociateId && data.associateId.toString().indexOf(searchByAssociateId.toString()) === -1){
            return false;
          }
          if (searchByEmail && data.email.toLowerCase().indexOf(searchByEmail.toLowerCase()) === -1){
              return false;
          }
          if (searchByMobile && data.mobileNum.toString().indexOf(searchByMobile.toString()) === -1){
            return false;
          }
		      if (searchByStrongskills && skillString.toLowerCase().indexOf(searchByStrongskills.toLowerCase()) === -1){
              return false;
          }
          return true;          
    })
  }
  else{
      return associateData;
  }
} 

}
