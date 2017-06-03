import { Pipe, PipeTransform } from '@angular/core';
/*
 * 个人中心“我发布”界面管道，赛选出属于用户发布活动
 * Usage:
 *   value | myedittask:exponent
 * Example:
 *   {{ arr |  myedittask:'U1024003'}}
 *   formats to: class = U1024003(当前用户ID)
*/

@Pipe({
  name: 'myedittask'
})
export class MyedittaskPipe implements PipeTransform {

  transform(value: any, med: any): any {
    let arr = [];
    value.forEach((item,index) => {
      if(item['uid']==med){
        arr.push(item);
      }
    });
    return arr
  }

}
