import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  // tab
  private perTab:Array<Object> = [
    {
      name:'进行中',
      num:0,
      isActive:true
    },
    {
      name:'我发布',
      num:1,
      isActive:false
    },
    {
      name:'时间轴',
      num:2,
      isActive:false
    }
  ];

  // 当前显示的 tab 页
  private tabNumber:Number = 0;

  constructor() { }

  ngOnInit() {
    // 设置list高度
    this.setListHeight();
  }

  // 设置list高度
  setListHeight(){
    let height = document.body.clientHeight-(52+198+15);
    // LDetails__list
    document.querySelector('.ctab_content').setAttribute('style','height:'+height+'px;overflow-y:scroll;');
    console.log(document.body.clientHeight)
  }

  // tab切换
  tabChange(obj){
    this.perTab.forEach((item,index)=>{
      item['isActive'] = false;
    })
    obj['isActive'] = true;
    this.tabNumber = obj['num'];
  }

}
