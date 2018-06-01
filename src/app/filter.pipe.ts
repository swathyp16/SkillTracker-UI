import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

 transform(associateData: any, filter: any, searchByName?: any,searchByAssociateId?:any,searchByEmail?:any,searchByMobile?:any,searchByStrongskills?:any): any {
   
    if (associateData && associateData.length){
      return associateData.filter(data =>{
          let flag = false;
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
          for(var i = 0; i<data.associateSkills.length; i++){
            if (searchByStrongskills && data.associateSkills[i].skillName.toLowerCase().includes(searchByStrongskills.toLowerCase())){
               flag = true;
            }
          }   
          if(flag == true){
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
