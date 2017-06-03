import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HomeListDataService } from '../../server/home-list-data.service';
import { UserService } from '../../server/user.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  // 当前登陆用户
  private User:Object = {};
  // 保存当前活动
  private activity:Object = {};

  constructor(
    private router:ActivatedRoute,
    private homeListServer:HomeListDataService,
    private userService:UserService,
    private cookieService:CookieService
  ) {
    // 当前登陆用户
    this.User = this.cookieService.getObject('MyBadGirl_LoginUser');
    // 保存当前活动
    this.activity = {
      changeBtn: false, // 记录当前用户是否已经加入的该活动，false 未加入，true 加入
      changeSubmitBtn:false, // 记录当前是发布动态 还是保存动态
      newDynamic: 0, // 用户的最新动态
    };
  }

  ngOnInit() {
    // 根据任务数据设置页面
    this.setDetailData();
  }

  // 发布动态 保存动态
  ReleaseDynamic(){
    // false 发布动态  true 保存动态
    if(this.activity['changeSubmitBtn']){
      // 判断有没有输入内容
      if(this.activity['newDynamic']){
        let Dynamic = {
          id: this.activity['id'],
          uid: this.User['Id'],
          name: this.User['account'],
          sum: this.activity['newDynamic'],
          count: this.activity['count']
        }
        this.homeListServer.setReleaseDynamic(Dynamic);
      }
      this.activity['changeSubmitBtn'] = false;
    }else{
      this.activity['changeSubmitBtn'] = true;
    }
    // 清空原有值
    this.activity['newDynamic'] = '';
  }

  // 根据任务数据设置页面
  setDetailData(){
    this.router.params.subscribe((params: Params) => {
        // params
        let aid = params;
        // 根据当前活动的id去服务中获取活动的详情
        this.activity = this.homeListServer.getDetail(aid['id']);
        // 判断当前登陆用户是否已经加入该活动
        this.changeBtnFun(this.activity['joinUser']);
        // 把动态的对象改为数组
        this.activity['dynamic'] = this.ObjChangeArr(this.activity['dynamic']);
        console.log(this.activity)
    });
  }

  // 对象改为数组
  ObjChangeArr(obj){
    let arr = [];
    for(let i in obj){
      arr.push(obj[i]);
    }
    return arr
  }

  // 判断当前登陆用户是否已经加入该活动
  changeBtnFun(Ulist){
    let uArray = [];
    // 对象改为数组
    for(let i in Ulist){
      uArray.push(Ulist[i])
    }
    // 获取当前用户
    let user = this.User;
    // 判断当前用户是否有加入该活动
    uArray.forEach((item,index) => {
      if(item['id'] == user['Id']){
        // true 说明该用户已经加入了该活动
        this.activity['changeBtn'] = 2;
      }
    });
    // console.log(this.activity['changeBtn'])
  }

  // 加入任务方法
  joinTaskFun(task){
    // true 说明该用户已经加入了该活动
    this.activity['changeBtn'] = true;
    // 获取当前登陆的用户数据
    let user = {
      id: this.cookieService.getObject('MyBadGirl_LoginUser')['Id'],
      name:this.cookieService.getObject('MyBadGirl_LoginUser')['account']
    }
    // 新建一个需要的任务对象
    let taskObj = {
      id: task['id'],
      cls: task['cls'],
      uid: task['uid'],
      name: task['name'],
      user: task['user'],
      date: task['date'],
      images: task['images'],
      target: task['target'],
      color: task['color']
    };
    // 通过服务更新野狗
    this.homeListServer.setWilddogJoinTaskFun(taskObj,user);
  }

}
