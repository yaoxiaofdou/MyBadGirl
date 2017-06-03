import { Injectable } from '@angular/core';
import * as wilddog from 'wilddog';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';

// import { Subject } from "rxjs/Subject";

@Injectable()

export class UserService {
  
  // 保存当前登陆用户信息
  public User:Object = {};
  // user 账号 密码 数据
  private userAccountData:Array<Object> =[];
  /*private userAccountData:Array<Object> = [
    {
      id:1024001,
      account:'xiaofeng.yao',
      password:'xiaofeng.yao'
    },
    {
      id:1024002,
      account:'congcong.rao',
      password:'congcong.rao'
    }
  ];*/

  // User 详细数据（头像，活动，名字）
  private userListData:Array<Object> = [
    {
      id:'1024001',
      img:'src/images/1.png',
      name:'xiaofeng.yao',
      joinSum:22,
      editSum:11
    },{
      id:'1024002',
      img:'src/images/rn.jpg',
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

  constructor(
    private http:Http
  ) { }

  // 创建 wilddog 链接
  public LinkWilddog(){
    const config = {
      syncURL: "https://wild-snake-2009.wilddogio.com" // URL
    };
    wilddog.initializeApp(config);
    const ref = wilddog.sync().ref();

    return ref
  }

  // 登陆验证 （账号，密码）
  public loginverification(){
    // 获取 wilddog 链接
    const ref = this.LinkWilddog();

    // 临时用户数组
    let userlist = [];
    // snapshot 里面的数据会一直和云端保持同步
    ref.child('User').on("value", function(snapshot) {
        userlist.push(snapshot.val())
    });

    this.userAccountData = userlist;
    
    return this.userAccountData
    

    // rxjs 流编程demo
    // let sub = new Subject();
    // let obs = sub.map(v => {
    //     console.log("ajax call"); 
    // });
    // obs.subscribe(v => console.log("subscribe 1"));
    // obs.subscribe(v => console.log("subscribe 2"));         
    // sub.next("value");

    // 需要异步处理
    // console.log(login)

    // 返回对于的用户信息
    
  }

  // 创建新用户
  public addNewUser(acut,psd,name){

    // 获取 wilddog 链接
    const ref = this.LinkWilddog();

    let usr = {
      account : acut,
      password : psd
    };

    // 每个用户有个属于自己的用户id
    ref.child('MyBadGirl-ID').child('UserID').transaction(function(currentValue) {
        let newValue = (currentValue||0) + 1;
        return newValue;
    }, function(err, committed, ss) {
        if( err ) {
          console.log(err);
        }
        else if( committed ) {
          // 如果counter加1成功，那么写入数据。
          let Id = 'U102400'+ss.val();  // 这里可以拿到自增后的id
          // 新用户数据写入数据库
          ref.child('User').child(Id).set({
            Id : Id,
            account : usr.account,
            password : usr.password,
          });
          // 新用户个人信息库
          ref.child('UserPersonal').child(Id).set({
            Id : Id,
            img : 'src/images/1.png',
            name : name,
            joinSum : 0,
            editSum : 0,
            joinTaskList : [],
          });
        }
    });
  }

  // 返回当前时间
  getNowFormatDate(){ 
    let day = new Date(); 
    let Year = 0; 
    let Month = 0; 
    let Day = 0; 
    let CurrentDate = ""; 
    //初始化时间 
    //Year= day.getYear();//有火狐下2008年显示108的bug 
    Year= day.getFullYear();//ie火狐下都可以 
    Month= day.getMonth()+1; 
    Day = day.getDate(); 
    //Hour = day.getHours(); 
    // Minute = day.getMinutes(); 
    // Second = day.getSeconds(); 
    CurrentDate += Year + "-"; 
    if (Month >= 10 ){ 
      CurrentDate += Month + "-"; 
    }else{ 
      CurrentDate += "0" + Month + "-"; 
    }if (Day >= 10 ){ 
      CurrentDate += Day ; 
    }else{ 
      CurrentDate += "0" + Day ; 
    }
    return CurrentDate;
  }

  // 删除用户指定活动方法
  removeWilddogJoinTaskFun(task,user){
    // 返回当前时间
    let date = this.getNowFormatDate();
    // 获取 wilddog 链接
    const ref = this.LinkWilddog();
    // console.log(task['id'])
    // console.log(user['Id'])
    // 删除用户中的加入活动数据
    ref.child('UserPersonal').child(user['Id']).child('joinTaskList').child(task['id']).remove();
    // 删除活动中的用户加入数据
    ref.child('MyBadGirl-Task').child(task['id']).child('joinUser').child(user['Id']).remove();
    // 更新当前用户删除的活动总数
    ref.child('UserPersonal').child(user['Id']).child('joinSum').once('value').then((snapshot)=>{
      let sum = snapshot.val();
      ref.child('UserPersonal').child(user['Id']).update({
        joinSum: sum - 1
      });
      // 更新服务中用户的数据
      this.User['joinSum'] = sum - 1;
    });
    // 删除用户 在当前活动中排名的数据
    ref.child('MyBadGirl-Task').child(task['id']).child('Ranking').child(user['Id']).remove();
    // 更新动态,推入最新动态
    ref.child('MyBadGirl-Task').child(task['id']).child('dynamic').push({
      date: date,
      name: user['name'],
      dynamic: '退出了该《' + task['cls'] + '》'
    });
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

  // 返回当前登陆用户
  public returnUser(){
    return this.User
  }

  // 删除用户列表方法
  public removeUserJoinTaskList(task){
    // 重新获取列表数据
    let arr = this.User['joinTaskList'];
    arr.forEach((item,index)=>{
      if(item['id']==task['id']){
        arr.splice(index,1);
      }
    });
    // console.log(arr)
    this.User['joinTaskList'] = arr;
    return this.User['joinTaskList']
  }

  // 获取到的野狗数据对象转换成数组
  public changeJoinArray(obj){
    let arr = [];
    for(let i in obj){
      arr.unshift(obj[i])
    }
    return arr
  }

  // 返回当前用户数据 :Promise<user>
  public getThisUser(id){
  
    // let url = 'https://wild-snake-2009.wilddogio.com/User/'+id+'/';
    // let durl = 'https://api.imjad.cn/cloudmusic/?type=detail&id=186137';
    // return this.http.get(url)
    //               .toPromise()
    //               .then(this.extractData)
    //               .catch(this.handleError);
    
    let user;
    
    // 获取 wilddog 链接
    const ref = this.LinkWilddog().child('UserPersonal').child(id);

    ref.once('value').then((snapshot)=>{
      console.log(snapshot.val());
      this.User = snapshot.val();
      // 把野狗返回的列表对象改成列表数组
      this.User['joinTaskList'] = this.changeJoinArray(this.User['joinTaskList']);
    }).catch(function(err){
      console.info(err);
    });

    // var onQuery = function(ref,event){ 
    //   return new Promise(function (resolve,reject) { 
    //     ref.on(event,
    //       function (snapshot) {
    //         console.log(snapshot.val());
    //         resolve(snapshot.val());
    //       },
    //       function(err){ 
    //         reject(err); 
    //       });
    //     });
    //   }

    // 获取对应的用户数据
    // ref.child('User').equalTo(Uid)
    // onQuery(ref,"value")
    // .then(function (data) {
    //   console.log(data)
    //   // return this.User
    // })
    // .catch(function (err) { 
    //   console.log("错误"+ err); 
    // })
  }

}

export interface user{
  Id: any,
  account: String,
  password: String,
}