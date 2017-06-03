import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { HomeListDataService } from '../../server/home-list-data.service';

import { CookieService } from 'angular2-cookie/services/cookies.service';
import { UserService } from '../../server/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // 主页对象
  private mybadgirl:Object = { };
  // 分类存储变量
  private homeCls:String = '';
  // 登陆用户
  private User:Object = {};

  // 弹窗类型对象
  public Girl:Object = {};

  constructor(
    private http:Http,
    private homeData:HomeListDataService,
    private cookieService:CookieService,
    private userService:UserService,
  ) {
    // 设置主页对象
    this.mybadgirl = {
      isMenu:false,  // 控制头部 menu 图标变化
      isClass:false, // 控制分类的动画样式变化
      isLogin:false, // 判断是否登陆,默认没有登陆
      clsMenu:[],    // 保存分类的数组
    };
    // 设置默认分类为全部
    this.homeCls = 'ALL';
  }

  ngOnInit() {
    // 页面登陆验证，验证是否已经登陆
    this.homeVerification();
    // 设置list高度
    this.setListHeight();
    // this.getHitokotoFun();
    // 从服务get分类数据
    this.getClassData();
  }

  // 用户刚进入页面的时候需要来一个 登录 判断 cookia 判断
  // 点击 user 按钮进行登录判断 ，隐藏 menu 图标按钮
  // 未登录仅显示 （首页，活动详情页）
  // 登录显示开发全部界面
  public homeVerification(){
    // 去服务中获取当前登陆用户
    // this.userService.loginverification();
    // 自动登陆的话，账号密码存储在cookie中，也是在这一步进行自动登陆
    this.User = this.cookieService.getObject('MyBadGirl_LoginUser');
    console.log(this.User)
    if(this.User){
      this.mybadgirl['isLogin'] = true;
    }else{
      this.mybadgirl['isLogin'] = false;
    }
  }

  // 设置list高度
  public setListHeight(){
    let height = document.body.clientHeight-50;
    document.querySelector('.homelist').setAttribute('style','height:'+height+'px;overflow-y:scroll;-webkit-overflow-scrolling:touch;');
    // console.log(document.body.clientHeight)
  }

  // 从服务get分类数据
  public getClassData(){
    this.mybadgirl['clsMenu'] = this.homeData.getHomeClsData();
  }

  // 设置分类选中
  public setClsIsActive(obj){
    this.mybadgirl['clsMenu'].forEach((item,index)=>{
      item['isActive'] = false;
    });
    obj['isActive'] = true;

    //  分类传递给列表
    this.homeCls = obj['name'];
    //  关闭分类框
    this.mybadgirl['isClass'] = false;
  }

  // menu 显示隐藏
  public showHomeMenu(){
    this.mybadgirl['isMenu'] = !this.mybadgirl['isMenu']
  }

  // get Hitokoto/ヒトコト
  public getHitokotoFun(){
    var url = 'https://api.imjad.cn/cloudmusic/?type=detail&id=186137';
    
    this.http.get(url)
            .toPromise()
            // 成功调用
            .then((data) => {
              //console.log(data.json())
            })

  }

}
