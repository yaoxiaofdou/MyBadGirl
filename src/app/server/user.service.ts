import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  // user 账号 密码 数据
  private userAccountData:Array<Object> = [
    {
      id:'1024001',
      account:'xiaofeng.yao',
      password:'xiaofeng.yao'
    },
    {
      id:'1024002',
      account:'congcong.rao',
      password:'congcong.rao'
    }
  ];

  // user 详细数据（头像，活动，名字）
  private userListData:Array<Object> = [
    {
      id:'1024001',
      img:'src/images/1.png',
      name:'xiaofeng.yao',
      joinSum:22,
      editSum:11
    },{
      id:'1024002',
      img:'src/images/1.png',
      name:'congcong.rao',
      joinSum:2,
      editSum:1
    }
  ];

  // 用户加入的活动列表
  private userJoinActivityData:Array<Object> = [
    {
      id:'1024001',
      data:[
        {
          id:'0001',
          cls:'任',
          name:'湖边跑步',
          images:'src/images/1.png',
          color:'64,114,175',
          user:'xiaofeng.yao',
          target:'每日完成5公里日常训练，坚持打卡。'
        },{ 
          id:'0002',
          cls:'活',
          name:'五缘湾联谊',
          images:'src/images/1.png',
          color:'92,184,180',
          user:'congcong.rao',
          target:'2017年5月1日，五缘湾音乐广场人肉联谊大赛，欢迎大家参加，费用每人40RMB。'
        }
      ]
    },{
      id:'1024002',
      data:[
        { 
          id:'0002',
          cls:'活',
          name:'五缘湾联谊',
          images:'src/images/1.png',
          color:'92,184,180',
          user:'congcong.rao',
          target:'2017年5月1日，五缘湾音乐广场人肉联谊大赛，欢迎大家参加，费用每人40RMB。'
        }
      ]
    }
  ];

  private user:Object;

  constructor() { }

  // 登陆验证 （账号，密码）现在是没有接入数据的做法
  loginverification(acnt,pasd){
    let login = {
      static:false,
      id:''
    };
    this.userAccountData.forEach((item,index)=>{
      // 如果账号密码都正确，返回 loginStatic = true
      if(item['account'] == acnt){
        if(item['password'] == acnt){
          login.static = true;
          login.id = item['id'];
        }
      }
    })
    // 都正确，则返回对于的用户信息
    if(login.static){
      this.userListData.forEach((item,index)=>{
        if(item['id'] == login.id){
          item['static'] = true;
          console.log(item)
          console.log(login)
          // 设置当前用户信息
          this.user = item;
          return login
        }
      })
    }else{
      // 如果账号密码都错误，返回 loginStatic = false
      console.log(login)
      return login
    }

  }

  // 返回当前用户数据
  getThisUser(){
    let user = this.userListData[0];
    return user
  }

}
