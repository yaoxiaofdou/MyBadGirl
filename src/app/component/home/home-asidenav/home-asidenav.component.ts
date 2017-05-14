import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../server/user.service';

@Component({
  selector: 'app-home-asidenav',
  templateUrl: './home-asidenav.component.html',
  styleUrls: ['./home-asidenav.component.scss']
})
export class HomeAsidenavComponent implements OnInit {

  // 当前登录的用户
  private user:Object = {};

  // menu 列表
  private menuList:Array<Object> = [
    {
      name:'挑战',
      icon:'icon-wodeyuezhan01',
      ddcolor:'av__Abtn__dekaron',
      color:'av__Abtn__dekaron--isActive',
      isMenu:true
    },{
      name:'计划',
      icon:'icon-jihua',
      ddcolor:'av__Abtn__plans',
      color:'av__Abtn__plans--isActive',
      isMenu:false
    },{
      name:'成果',
      icon:'icon-price',
      ddcolor:'av__Abtn__results',
      color:'av__Abtn__results--isActive',
      isMenu:false
    }
  ];

  constructor(
    private userServer:UserService,
  ) { }

  ngOnInit() {
    // 从服务获取当前登录用户
    this.getUser();
  }

  // 从服务获取当前登录用户
  getUser(){
    this.user = this.userServer.getThisUser();
  }

  // menu tab 切换
  avAbtnChange(obj){
    this.menuList.forEach((item,index)=>{
      item['isMenu'] = false;
    })
    obj['isMenu'] = true;
  }

}
