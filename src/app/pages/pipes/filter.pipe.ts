import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, ...arg: any): any {
    const resultUsuarios = [];
    for (const element of value) {
      if (element.roles.indexOf(arg) > -1) {
        resultUsuarios.push(element);
      };
    };
    return resultUsuarios;
  }

}
