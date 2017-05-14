import { Injectable } from '@angular/core';

@Injectable()
export class HomeListDataService {

  //  把活动数据区分为四张表存储
  //  HomeListData        主页列表-表头数据
  //  HomeListDetailRG    主页列表-详情数据(任务，规则)
  //  HomeListDetailD     主页列表-详情数据(动态)
  //  HomeListDetailP     主页列表-详情数据(排行)

  // 主页列表-表头数据
  private HomeListData:Array<Object> = [
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
  ];
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

  constructor() { }
  
  // 获取首页列表
  getHomeData(){
    return this.HomeListData
  }

  // 获取当前活动详情
  getDetail(obj){
    // 保存数组；过滤出属于当前活动的信息
    let detail = {};
    // 主页列表-详情数据(任务，规则)
    this.HomeListData.forEach((item,index)=>{
      if(item['id']==obj.id){
        detail = item;
      }
    });
    // 主页列表-详情数据(任务，规则)
    this.HomeListDetailRG.forEach((item,index)=>{
      if(item['id']==obj.id){
        detail['rule'] = item['rule'];
        detail['sum'] = item['sum'];
        detail['unit'] = item['unit'];
      }
    });
    // 主页列表-详情数据(动态)
    this.HomeListDetailD.forEach((item,index)=>{
      if(item['id']==obj.id){
                                                                                                                                                      detail['list'] = item['list'];
      }  2
    });
    // 主页列表-详情数据(排行)
    this.HomeListDetailP.forEach((item,index)=>{
      if(item['id']==obj.id){
        detail['Ranking'] = item['Ranking'];
      }
    });
    
    // 返回组装好的活动数据
    return detail
  }

  // 获取分类数据
  getHomeClsData(){
    return this.HomeListClass
  }

}
