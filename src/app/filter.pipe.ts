import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
result = [];
 transform(associateData: any, filter: any, searchByName?: any,searchByAssociateId?:any,searchByEmail?:any,searchByMobile?:any,searchByStrongskills?:any): any {
   
    if (associateData && associateData.length){
      return associateData.filter(data =>{
          let flag = 0;
		  
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
		  if(searchByStrongskills){
		  //(var j =0 ; j < associateData.length ; j++){
          for(var i = 0; i<data.associateSkills.length; i++){
            if (searchByStrongskills && data.associateSkills[i].skillName.toLowerCase().indexOf(searchByStrongskills.toLowerCase()) === -1){
               flag = 0;
			   
            } else {
				flag = flag + 1;
				this.result.push(data);
			}			
          }
			 
		 // }	
			
			if(flag > 0){
				console.log("**************  result *********** " : + JSON.stringify(this.result));
				return this.result;
			} else{
				return false;
			}
		  }		
		   if(!searchByStrongskills){
				return true;
			} 
			
          
    })
  }
  else{
      return associateData;
  }
} 

}
