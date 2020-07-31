import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../interfaces/category.interface';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(cat: Array<ICategory>, sortIDCol: boolean, sortENCol: boolean, sortUACol: boolean): unknown {
    if (sortENCol == true) {
      return cat.sort(function (a, b) {
        if (a.nameEN.toLowerCase()< b.nameEN.toLowerCase()) {
         return -1
        }
        
      })
    }

    if (sortUACol == true) {
      return cat.sort(function (a, b) {
        if (a.nameUA.toLowerCase() < b.nameUA.toLowerCase()) {
          return -1
        }
      })
    }

    if (sortIDCol == true) {
      return cat.sort(function (a, b) {
        if (a.id < b.id) {
          return -1
        }
      })
    }
  
    else {
      return cat.reverse()
    }

  }

}
