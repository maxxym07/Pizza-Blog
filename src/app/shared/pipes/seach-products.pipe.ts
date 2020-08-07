import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/product.interfaces';

@Pipe({
  name: 'searchProducts'
})
export class SeachProductsPipe implements PipeTransform {

  transform(product: Array<IProduct>, searchString: string): unknown {
    if (!product) {
      return null
    }
    if (!searchString) {
      return product;
    }
    return product.filter(elem =>
      elem.id.toString().includes(searchString.toLowerCase())
      || elem.nameEN.toLowerCase().includes(searchString.toLowerCase())
      || elem.nameUA.toLowerCase().includes(searchString.toLowerCase())
      || elem.category.nameEN.toLowerCase().includes(searchString.toLowerCase())
      || elem.weight.toLowerCase().includes(searchString.toLowerCase())
      || elem.price.toString().includes(searchString.toLowerCase())
    )
  }

}
