import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // transform(associateData: any, searchByName?: any): any {
  //   if(searchByName === undefined){
  //     return associateData;
  //   }

  //   return associateData.filter(function(data){
  //     return data.name.toLowerCase().includes(searchByName.toLowerCase());
  //   });

  // transform(items: any, filter: any ,searchByName?: any,searchByAssociateId?: any): any {
  //   if (filter && Array.isArray(items)) {
  //     let filterKeys = Object.keys(filter);
  //     console.log("filterKeys : "+ filterKeys);
  //     console.log("searchByName : "+ searchByName);
  //     console.log("searchByAssociateId : "+ searchByAssociateId);
       // if(searchByName === undefined){
      //       return associateData;
      //     }
      
      //     return associateData.filter(function(data){
      //       return data.name.toLowerCase().includes(searchByName.toLowerCase());
      //     });
    //   if (isAnd) {
    //     return items.filter(item =>
    //         filterKeys.reduce((memo, keyName) =>
    //             (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "", true));
    //   } else {
    //     return items.filter(item => {
    //       return filterKeys.some((keyName) => {
    //         console.log(keyName);
    //         return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] === "";
    //       });
    //     });
    //   }
    // } else {
    //   return items;
    // }
  //}

  transform(associateData: any, filter: any, searchByName?: any,searchByAssociateId?:any): any {
    debugger
    if (filter && Array.isArray(associateData)) {
      let filterKeys = Object.keys(filter).toString();
      let x = filterKeys.split(",");
      for(var i=0 ; i<x.length; i++){
        console.log("i : "+ i + "x[i] : "+ x[i]); 
        return associateData.filter(data => {           
          if(x[i] == "name"){
            if(searchByName === undefined || searchByName === ""){
              return associateData;
            }
            return data.name.toLowerCase().includes(searchByName.toLowerCase());
          } else if(x[i] == "associateId"){
            if(searchByAssociateId === undefined || searchByAssociateId === ""){
              return associateData;
            }
            return data.associateId.toLowerCase().includes(searchByAssociateId.toLowerCase());
          }
           //return data[x[i]].toLowerCase().includes(filter[x[i]].toLowerCase());
          //});
        });
      }
    } else {
      return associateData;
   }
  } 

}
