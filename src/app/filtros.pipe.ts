import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtros'
})
export class FiltrosPipe implements PipeTransform {

  
  transform(value: any,args: any): any {
    const resultado=[]
    
   console.log("eb22222",value);
   
    for(const post of value){
      //console.log("fillll ", post);
      
        var elemet=""+post.title
        var valor=""+args
        if(elemet.toLowerCase().indexOf(valor.toLowerCase())>-1){
            console.log("echo");
            resultado.push(post)
        }
        
    }

    if(resultado.length==0){
      console.log("vvvvvvvvvvvv",value);
      
      return value
    }else
    return resultado
  }

}
