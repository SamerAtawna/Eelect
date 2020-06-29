import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileName'
})
export class FileNamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.slice(0, value.indexOf("."));
  }

}
