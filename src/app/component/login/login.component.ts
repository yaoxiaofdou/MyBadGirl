import { Component, OnInit ,NgModule } from '@angular/core';
import { UserService } from '../../server/user.service';

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
    // loginStatic 服务里对登陆信息的验证返回一个含有一个 布尔值 和 用户id 的对象
    if(loginStatic['static']){
      // 调用正确弹窗
      this.Girl = {
        type : 'success',
        content : '登陆成功',
        show : true,
      };
    }else{
      // 调用错误弹窗
      this.Girl = {
        type : 'danger',
        content : '账号密码错误,请重新输入',
        show : true,
      };
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