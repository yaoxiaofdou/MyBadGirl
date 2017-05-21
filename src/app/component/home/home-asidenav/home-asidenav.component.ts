import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../server/user.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-asidenav',
  templateUrl: './home-asidenav.component.html',
  styleUrls: ['./home-asidenav.component.scss']
})
export class HomeAsidenavComponent implements OnInit {

  // 当前登录的用户
  private User;

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
    private cookieService:CookieService,
    private router:Router
  ) { }

  ngOnInit() {
    // 从服务获取当前登录用户
    this.getUser();
  }

  // 监听服务中用户数据的变化，写入当前侧边栏。
  ngDoCheck(){
    this.User = this.userServer.returnUser();
    // console.log(this.User)
  }

  // 从服务获取当前登录用户
  getUser(){
    let user = this.cookieService.getObject('MyBadGirl_LoginUser');
    // 传入用户id 返回用户数据
    if(user){
      // this.userServer.getThisUser(user['Id']);
      this.userServer.getThisUser(user['Id']);  
      // this.userServer.getThisUser(user['Id'])
      //              .then(
      //                data => console.log(data),
      //                error =>  console.log(error));
    }
  }

  // 退出登陆
  public signOut(){
    // 删除cookie中的登陆信息
    this.cookieService.remove('MyBadGirl_LoginUser');
    // 路由跳转到首页
    this.router.navigate(['/login']);
  }

  // menu tab 切换
  avAbtnChange(obj){
    this.menuList.forEach((item,index)=>{
      item['isMenu'] = false;
    })
    obj['isMenu'] = true;
  }

}
