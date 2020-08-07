import { Pipe, PipeTransform } from '@angular/core';
import { IBlog } from '../interfaces/blog.interfaces';

@Pipe({
  name: 'blogSearch'
})
export class BlogSearchPipe implements PipeTransform {

  transform(blog: Array<IBlog>, searchString: string): unknown {
    if (!blog) {
      return null
    }
    if (!searchString) {
      return blog;
    }
    return blog.filter(elem =>
      elem.id.toString().includes(searchString.toLowerCase())
      || elem.title.toLowerCase().includes(searchString.toLowerCase())
      || elem.text.toLowerCase().includes(searchString.toLowerCase())
      || elem.author.toLowerCase().includes(searchString.toLowerCase())
    )
  }

}
