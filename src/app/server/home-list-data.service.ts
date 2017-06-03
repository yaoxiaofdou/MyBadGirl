import { Injectable } from '@angular/core';
import * as wilddog from 'wilddog';

@Injectable()
export class HomeListDataService {

  //  把活动数据区分为四张表存储
  //  HomeListData        主页列表-表头数据
  //  HomeListDetailRG    主页列表-详情数据(任务，规则)
  //  HomeListDetailD     主页列表-详情数据(动态)
  //  HomeListDetailP     主页列表-详情数据(排行)

  // 主页列表-表头数据
  private HomeListData:Array<Object> = [];
  /*  private HomeListData:Array<Object> = [
    { 
      id:'0001',
      cls:'任',
      name:'湖边跑步',
      images:'src/images/1.png',
      color:'64,114,175',
      user:'xiaofeng.yao',
      target:'每日完成5公里日常训练，坚持打卡。'
    },
    { 
      id:'0002',
      cls:'活',
      name:'五缘湾联谊',
      images:'src/images/1.png',
      color:'92,184,180',
      user:'congcong.rao',
      target:'2017年5月1日，五缘湾音乐广场人肉联谊大赛，欢迎大家参加，费用每人40RMB。'
    },{ 
      id:'0003',
      cls:'任',
      name:'湖边跑步',
      images:'src/images/1.png',
      color:'240,173,78',
      user:'xiaofeng.yao',
      target:'每日完成5公里日常训练，坚持打卡。'
    },
    { 
      id:'0004',
      cls:'活',
      name:'五缘湾联谊',
      images:'src/images/1.png',
      color:'201,48,44',
      user:'congcong.rao',
      target:'2017年5月1日，五缘湾音乐广场人肉联谊大赛，欢迎大家参加，费用每人40RMB。'
    },
  ];*/
  // 主页列表-详情数据(任务，规则)
  private HomeListDetailRG:Array<Object> = [
    { 
      id:'0001',
      sum:94520,
      unit:'公里',
      rule:['1:跑步结束后咕咚公里数配速截图。','2:训练中休息不能超过10次。','3:训练中不能吃东西。','4：配速要求超过 9min/KM。','5:不能骑自行车。']
    },
    {
      id:'0002',
      sum:12580,
      unit:'RMB',
      target:'2017年5月1日，五缘湾音乐广场人肉烧烤，欢迎大家参加，费用每人40RMB。',
      rule:['1:请来宾在入场时交联谊费，谢谢合作,基本费用可以看，什么都不能做。','2:需要特殊服务的，额外交取500RMB。','3:仅仅只是拉拉手，亲亲的，额外多交200RMB.']
    },
    {
      id:'0003',
      sum:12306,
      unit:'RMB',
      target:'2017年5月1日，五缘湾音乐广场人肉烧烤，欢迎大家参加，费用每人40RMB。',
      rule:['1:请来宾在入场时交联谊费，谢谢合作,基本费用可以看，什么都不能做。','2:需要特殊服务的，额外交取500RMB。','3:仅仅只是拉拉手，亲亲的，额外多交200RMB.']
    },
    {
      id:'0004',
      sum:52033,
      unit:'RMB',
      target:'2017年5月1日，五缘湾音乐广场人肉烧烤，欢迎大家参加，费用每人40RMB。',
      rule:['1:请来宾在入场时交联谊费，谢谢合作,基本费用可以看，什么都不能做。','2:需要特殊服务的，额外交取500RMB。','3:仅仅只是拉拉手，亲亲的，额外多交200RMB.']
    }
  ];
  // 主页列表-详情数据(动态)
  private HomeListDetailD:Array<Object> = [
    {
      id:'0001',
      list:[
        {
          id:'10240001',
          name:'xiaofeng.yao',
          dynamic:'5KM,配速6.30',
          date:'2017/04/20'
        },{
          id:'10240002',
          name:'congcong.rao',
          dynamic:'5KM,配速10.20',
          date:'2017/04/25'
        }
      ]
    },{
      taskId:'0002',
      list:[
        {
          id:'10240001',
          name:'xiaofeng.yao',
          dynamic:'5KM,配速6.30',
          date:'2017/04/20'
        },{
          id:'10240002',
          name:'congcong.rao',
          dynamic:'加入活动',
          date:'2017/04/25'
        }
      ]
    }
  ];
  // 主页列表-详情数据(排行),任务型的以任务完成数（距离）来对用户进行排行，活动型的以加入活动时间的先后进行排行。
  private HomeListDetailP:Array<Object> = [
    {
      id:'0001',
      Ranking:[
        {
          id:'10240001',
          name:'xiaofeng.yao',
          sum:20000,
        },{
          id:'10240002',
          name:'congcong.rao',
          sum:520,
        }
      ]
    },{
      id:'0002',
      Ranking:[
        {
          id:'10240001',
          name:'xiaofeng.yao',
          data:'2017/04/20',
        },{
          id:'10240002',
          name:'congcong.rao',
          data:'2017/04/25',
        }
      ]
    }
  ];

  // 分类数据
  private HomeListClass:Array<Object> = [
    {
      id:'R001',
      name:'ALL',
      isActive:true
    },{
      id:'R002',
      name:'活',
      isActive:false
    },{
      id:'R003',
      name:'任',
      isActive:false
    }
  ]

  // 当前活动详情（单个）
  private listdetail:Object = {};

  constructor() { }

  // 创建 wilddog 链接
  public LinkWilddog(){
    const config = {
      authDomain: "wild-snake-2009.wilddogio.com",
      syncURL: "https://wild-snake-2009.wilddogio.com"
    };
    wilddog.initializeApp(config);
    const ref = wilddog.sync().ref();
    return ref
  }
  
  // 获取首页列表
  getHomeData(){
    // 链接野狗数据库
    const ref = this.LinkWilddog();

    let list = [];

    ref.child('MyBadGirl-Task').on("child_added", function(snapshot) {
      list.unshift(snapshot.val());
    });

    this.HomeListData = list;
    return this.HomeListData

  }

  // 获取当前活动详情
  getDetail(id){
    // 链接 wilddog 
    const ref = this.LinkWilddog();
    let detail: Object;
    ref.child('MyBadGirl-Task').child(id).on('value',(data)=>{
      detail = data.val();
    })
    console.log(detail);
    this.listdetail = detail;
    // 反转数组
    let arr = [];
    for(let i in this.listdetail['dynamic']){
      arr.unshift(this.listdetail['dynamic'][i]);
    }
    this.listdetail['dynamic'] = arr;
    // 整合排名
    this.listdetail['Ranking'] = this.setHomeListDetailRanking(this.listdetail['Ranking'])
    
    return this.listdetail;
  }

  // 活动详情 排名
  setHomeListDetailRanking(obj){
    let arr = [];
    // 野狗对象转换成数组
    for(let i in obj){
      arr.push(obj[i])
    }
    // 对数组进行排名
    arr.sort(this.compare("sum"));
    console.log(arr)
    return arr;
  }

  // 数组对象降序排列
  compare(prop) {
      return function (obj1, obj2) {
          var val1 = obj1[prop];
          var val2 = obj2[prop];
          if (val1 < val2) {
              return 1;
          } else if (val1 > val2) {
              return -1;
          } else {
              return 0;
          }
      }
  }

  // 用户发布动态
  setReleaseDynamic(Dynamic) {
    // 返回当前时间
    let date = this.getNowFormatDate();
    // 获取 wilddog 链接
    const ref = this.LinkWilddog();
    // 更新动态,推入最新动态
    ref.child('MyBadGirl-Task').child(Dynamic['id']).child('dynamic').push({
      date: date,
      name: Dynamic['name'],
      dynamic: Dynamic['sum'] + Dynamic['count']
    });
    // 服务中更新 动态数据
    this.listdetail['dynamic'].unshift({
      date: date,
      name: Dynamic['name'],
      dynamic: Dynamic['sum'] + Dynamic['count']
    });
    // 更新任务的总里程
    ref.child('MyBadGirl-Task').child(Dynamic['id']).child('sum').once('value').then((snapshot)=>{
      let sum = snapshot.val();
      let thisSum = parseInt(Dynamic['sum']);
      ref.child('MyBadGirl-Task').child(Dynamic['id']).update({
        sum: sum + thisSum
      });
      // 服务中更新 总数数据
      this.listdetail['sum'] = sum + thisSum;
    });
    // 更新排名里的总里程
    ref.child('MyBadGirl-Task').child(Dynamic['id']).child('Ranking').child(Dynamic['uid']).child('sum').once('value').then((snapshot)=>{
      let sum = snapshot.val();
      let thisSum = parseInt(Dynamic['sum']);
      ref.child('MyBadGirl-Task').child(Dynamic['id']).child('Ranking').child(Dynamic['uid']).update({
        sum: sum + thisSum
      });
      // 服务中更新 总数排名数据
      this.listdetail['Ranking'].forEach((item,index) => {
        if (item['id'] == Dynamic['uid']) {
          item['sum'] = sum + thisSum;
        }
      });
      // 重新排名
      this.listdetail['Ranking'].sort(this.compare("sum"));
    });
  }

  // 用户加入活动方法
  setWilddogJoinTaskFun(task, user){
    // 返回当前时间
    let date = this.getNowFormatDate();
      // 获取 wilddog 链接
    const ref = this.LinkWilddog();
    // console.log(task);
    // console.log(user);
    // 任务中添加 当前用户加入该活动的时间
    task['beginDate'] = date;
    // 加入的活动 写入 用户数据
    ref.child('UserPersonal').child(user['id']).child('joinTaskList').child(task['id']).set(task);
    // 加入的活动 写入 活动数据 (目的：区分当前登陆用户是否有加入该活动，如果已经加入了，则改变按钮为查看“查看数据分析”或者“退出任务”)
    ref.child('MyBadGirl-Task').child(task['id']).child('joinUser').child(user['id']).set({
      id: user['id'],
      name: user['name']
    });
    // 更新当前用户加入的活动总数
    ref.child('UserPersonal').child(user['id']).child('joinSum').once('value').then((snapshot)=>{
      let sum = snapshot.val();
      ref.child('UserPersonal').child(user['id']).update({
        joinSum: sum + 1
      });
    });
    // 更新动态,推入最新动态
    ref.child('MyBadGirl-Task').child(task['id']).child('dynamic').push({
      date: date,
      name: user['name'],
      dynamic: '加入该《' + task['cls'] + '》'
    });
    // 服务中更新 动态数据
    this.listdetail['dynamic'].unshift({
      date: date,
      name: user['name'],
      dynamic: '加入该《' + task['cls'] + '》'
    });
    // 加入新用户排名数据
    ref.child('MyBadGirl-Task').child(task['id']).child('Ranking').child(user['id']).set({
      id: user['id'],
      name: user['name'],
      sum: 0
    });
    // 服务中更新 排行加入新玩家
    let RankingSwitch = false;
    this.listdetail['Ranking'].forEach((item,index) => {
      // 判断是不是已经有了当前用户
      if(item['id'] == user['id']){
        RankingSwitch = true;
      }
    });
    if(!RankingSwitch){
      this.listdetail['Ranking'].push({
        id: user['id'],
        name: user['name'],
        sum: 0
      });
    }
  }

  // 获取分类数据
  getHomeClsData(){
    return this.HomeListClass
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

  // 新活动数据写入数据库
  setWilddogTaskData(task){
    // 链接野狗数据库
    const ref = this.LinkWilddog();
    // 返回当前时间
    let date = this.getNowFormatDate();
    // 每个用户有个属于自己的用户id
    ref.child('MyBadGirl-ID').child('Task-ID').transaction(function(currentValue) {
        let newValue = (currentValue||0) + 1;
        return newValue;
    }, function(err, committed, ss) {
        if( err ) {
          console.log(err);
        }
        else if( committed ) {
          // 如果counter加1成功，那么写入数据。
          let Id = 'H102400'+ss.val();  // 这里可以拿到自增后的id
          // 新任务写入数据库
          ref.child('MyBadGirl-Task').child(Id).set({
            id: Id,
            cls: task['cls'],
            uid:  task['uid'],
            name: task['name'],
            images: task['images'],
            color: task['color'],
            user: task['user'],
            target: task['target'],
            rule: task['rule'],
            count: task['count'],
            date: task['date'], // 任务结束时间
            beginDate: date,    // 任务开始时间
            sum: 0,     // 总数
            dynamic:[
               {
                name: task['user'],
                dynamic: '创建了该《'+task['cls']+'》',
                date: date
               }
            ], // 动态
          });
          // 发布当前活动的用户直接加入活动
          ref.child('MyBadGirl-Task').child(Id).child('joinUser').child(task['uid']).set({
            id: task['uid'],
            name: task['user']
          });
          // 发布当前活动的用户直接写入排名
          ref.child('MyBadGirl-Task').child(Id).child('Ranking').child(task['uid']).set({
            id: task['uid'],
            name: task['user'],
            sum: 0
          });
          // 用户信息也要更新用户已经加入了当前这个活动
          ref.child('UserPersonal').child(task['uid']).child('joinTaskList').child(Id).set({
            id: Id,
            cls: task['cls'],
            uid:  task['uid'],
            name: task['name'],
            images: task['images'],
            color: task['color'],
            user: task['user'],
            target: task['target'],
            date: task['date'], // 任务结束时间
            beginDate: date,    // 任务开始时间
          });
          // 更新当前用户 参加的活动总数
          ref.child('UserPersonal').child(task['uid']).child('joinSum').once('value').then((snapshot)=>{
            let sum = snapshot.val();
            ref.child('UserPersonal').child(task['uid']).update({
              joinSum: sum + 1
            });
          });
          // 更新当前用户 发布的活动总数
          ref.child('UserPersonal').child(task['uid']).child('editSum').once('value').then((snapshot)=>{
            let sum = snapshot.val();
            ref.child('UserPersonal').child(task['uid']).update({
              editSum: sum + 1
            });
          });
        }
    });
  }

}
