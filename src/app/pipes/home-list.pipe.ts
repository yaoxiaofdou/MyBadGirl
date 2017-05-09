import { Pipe, PipeTransform } from '@angular/core';
/*
 * 首页分类管道
 * Usage:
 *   value | listCls:exponent
 * Example:
 *   {{ listData |  listCls:'任'}}
 *   formats to: class = 任
*/
@Pipe({
  name: 'listCls'
})
export class HomeListPipe implements PipeTransform {

  transform(value: any, cls: any): any {
    let newArr = [];
    if(cls !== 'ALL'){
      value.forEach((item,index)=>{
        if(item['cls'] == cls){
          newArr.push(item);
        }
      })
      return newArr
    }else{
      return value
    }
  }

}
