import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'digitfix'
})
export class DigitfixPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if(value.toString().indexOf(".") > -1){
      return value.toString().slice(0, value.toString().indexOf("."));
    }
    return value;
  }

}
