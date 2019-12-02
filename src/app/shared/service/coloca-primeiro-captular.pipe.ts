import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colocaPrimeiroCaptular'
})
export class ColocaPrimeiroCaptularPipe implements PipeTransform {

  transform(value:string): string {
    return value.substring(0,1).toUpperCase() + value.substring(1).toLowerCase();
  }

}