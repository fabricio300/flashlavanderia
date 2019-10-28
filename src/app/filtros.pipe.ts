import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtros'
})
export class FiltrosPipe implements PipeTransform {

  transform(value: any,args: any): any {
    const resultado=[]
    const otro=[]
   
    for(const post of value){
        var elemet=""+post.title
        var valor=""+args
        if(elemet.toLowerCase().indexOf(valor.toLowerCase())>-1){
            console.log("echo");
            resultado.push(post)
        }
        otro.push(post)
    }

    if(resultado.length==0){
    
      return otro
    }else
    return resultado
  }

}
