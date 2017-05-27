import { Component, OnInit } from '@angular/core';
import { UserService } from '../../server/user.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  // 保存当前用户
  private User:Object;

  // 头部样式
  private headerCls:Boolean = false;

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

  constructor(
    private userService:UserService,
    private cookieService:CookieService
  ) { }

  ngOnInit() {
    // 设置list高度
    this.setListHeight();
    // 获取当前用户数据
    this.getUser();
  }

  // 监听服务中用户数据的变化，写入当前侧边栏。
  ngDoCheck(){
    this.User = this.userService.returnUser();
    // console.log(this.User)
  }

  // 获取当前用户数据
  getUser(){
    let user = this.cookieService.getObject('MyBadGirl_LoginUser');
    this.userService.getThisUser(user['Id']);
  }

  // 设置list高度
  setListHeight(){
    let height = document.body.clientHeight-(52+148);
    // LDetails__list
    document.querySelector('.ctab_content').setAttribute('style','height:'+height+'px;overflow-y:scroll;-webkit-overflow-scrolling:touch;');
    // console.log(document.body.clientHeight)
    
  }

  // 监听滚动事件，给头部绑定动态样式
  ctabScrollFun(e){
    let top = e.srcElement.scrollTop;
    if(top > 0){
      this.headerCls = true;
      return false;
    }
    this.headerCls = false;
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
