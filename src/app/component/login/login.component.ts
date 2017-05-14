import { Component, OnInit ,NgModule,Input } from '@angular/core';
import { UserService } from '../../server/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input()
  // 登录页面初始对象
  public login:Object = {};

  constructor(
    private userService:UserService,
  ) { 
    // 登录页面初始对象 赋值
    this.login = {
      isActive:true,  // 控制显示 登陆表单  注册表单
      Uname:'',       // login username
      pwd:'',         // login pwd
      newUname:'',    // register username
      newPwd:'',      // register pwd
      name:'',        // register name
    }
  }

  ngOnInit() {
  }

  // 登陆方法
  public UserLogin(){
    let usr = this.login['Uname'];
    let pwd = this.login['pwd'];
    let loginStatic = this.userService.loginverification(usr,pwd);
    if(loginStatic){
      alert()
    }
  }

  // 跳转注册
  public hrefRegister(){
    this.login['isActive'] = false;
  }

  // 跳转登陆
  public hrefLogin(){
    this.login['isActive'] = true;
  }

}

export interface Login{
  isActive: Boolean,
  Uname: String,
  pwd: String,
  newUname: String,
  newPwd: String,
  name: String, 
}