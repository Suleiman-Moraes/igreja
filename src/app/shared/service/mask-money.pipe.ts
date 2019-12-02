import { Pipe, PipeTransform } from '@angular/core';
import { BaseResourceFormComponent } from '../components/base-resource-form/base-resource-form.component';

@Pipe({
  name: 'maskMoney'
})
export class MaskMoneyPipe implements PipeTransform {
    
    transform(value:Number) {
        if(value.toString().indexOf('R$') > -1){
            value = new Number(value.toString().split(' ')[1].replace(',','.'));
        }
        console.log(value);
        let decimal:string = value.toFixed(2).split('.')[1];
        let valueToTransform:string = value.toFixed(2).split('.')[0];
        
        //Transforma
        let begin = 0;
        for(let i = valueToTransform.length-1, j = 1; i > -1; i-- ){
            if( (j % 3 == 0) && (i-1 > -1) ){
                valueToTransform = valueToTransform.slice(begin,i) + '.' + valueToTransform.slice(i);
                j++;
            }
            else{
                if(valueToTransform[i] != '.') j++;
            }
        }
        
        return 'R$ '+ valueToTransform + ',' + decimal;
    }
}