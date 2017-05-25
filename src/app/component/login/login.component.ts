import { Component, OnInit ,NgModule } from '@angular/core';
import { UserService } from '../../server/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // 登录页面初始对象
  public login:Object = {};

  // 弹窗类型对象
  public Girl:Object = {};

  // public alertType:String = 'danger';
  // public alertContent:String = '输入错误请重新输入';
  // public AlertisActive:Boolean = false;

  constructor(
    private userService:UserService,
    private router:Router,
    private cookieservice:CookieService
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
    // 调用一次账户数据服务,这种做法不好，会暴露所有用户信息(临时使用)
    this.userService.loginverification();
  }

  // 登陆方法，登陆验证
  public UserLogin(){
    let usr = this.login['Uname'];
    let pwd = this.login['pwd'];
    let Userlist = this.userService.loginverification();
    let loginStop = false;
    Userlist.forEach((item,index)=>{
      for(let i in item){
        console.log(item[i])
        if(item[i]['account'] == usr){
          if(item[i]['password'] == pwd){
            // 调用正确弹窗
            this.Girl = {
              type : 'success',
              content : '登陆成功',
              show : true,
            };
            // 登陆信息写入cookie
            this.cookieservice.putObject('MyBadGirl_LoginUser',{ 
              'Id' : item[i]['Id'],
              'account' : item[i]['account'],
              'password' : item[i]['password'],
            });
            // 登陆成功，路由跳转首页
            this.router.navigate(['/home']);
            // 关闭开关
            loginStop = true;
          }
        }
      }
      
    });
    // 登陆错误检测
    if(!loginStop){
      // 调用错误弹窗
      this.Girl = {
        type : 'danger',
        content : '登陆错误,请重新输入',
        show : true,
      };
    }
    

  }

  // 跳转注册
  public hrefRegister(){
    this.login['isActive'] = false;
  }

  // 创建新用户
  public NewUser(){
    if(this.login['newUname'] == '' || this.login['newPwd'] == '' || this.login['name'] == ''){
      // 调用错误弹窗
      this.Girl = {
        type : 'danger',
        content : '输入信息不完全，请重新输入',
        show : true,
      };
    }else{
      this.userService.addNewUser(this.login['newUname'],this.login['newPwd'],this.login['name']);
      // 调用正确弹窗
      this.Girl = {
        type : 'success',
        content : '新用户创建成功',
        show : true,
      };
      this.login['isActive'] = true;
    }
  }

  // 重置表单
  public formReset(){
    this.login = {
      Uname:'',       // login username
      pwd:'',         // login pwd
      newUname:'',    // register username
      newPwd:'',      // register pwd
      name:'',        // register name
    };
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