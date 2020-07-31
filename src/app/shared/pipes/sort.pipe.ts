import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../interfaces/category.interface';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(cat: Array<ICategory>, sortIDCol: boolean, sortENCol: boolean, sortUACol: boolean): unknown {
 
    if (sortENCol==true) {
      return cat.sort((a, b) => a.nameEN.toLowerCase() < b.nameEN.toLowerCase() ? -1 : 1);
    }

    else if (sortUACol==true) {
      return cat.sort((a, b) => a.nameUA.toLowerCase() < b.nameUA.toLowerCase() ? -1 : 1);
    }
      
    else if (sortIDCol==true) {
      return cat.sort((a, b) => a.id < b.id ? -1 : 1).reverse();
    }
      
    else if (sortENCol === false || sortUACol === false || sortIDCol === false) {
      return cat.reverse();
    }
      
    else return cat;
  }

  }
