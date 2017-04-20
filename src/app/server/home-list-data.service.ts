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
      user:'baichi.rao',
      target:'2017年5月1日，五缘湾音乐广场人肉联谊大赛，欢迎大家参加，费用每人40RMB。'
    },
  ];
  // 主页列表-详情数据(任务，规则)
  private HomeListDetailRG:Array<Object> = [
    { 
      id:'0001',
      target:'每日完成5公里日常训练，坚持打卡。',
      rule:'1:跑步结束后咕咚公里数配速截图。2:训练中休息不能超过10次。3:训练中不能吃东西。4：配速要求超过 9min/KM。5:不能骑自行车。'
    },
    {
      id:'0002',
      target:'2017年5月1日，五缘湾音乐广场人肉烧烤，欢迎大家参加，费用每人40RMB。',
      rule:'1:请来宾在入场时交联谊费，谢谢合作,基本费用可以看，什么都不能做。2:需要特殊服务的，额外交取500RMB。仅仅只是拉拉手，亲亲的，额外多交200RMB.',
    },
  ];
  // 主页列表-详情数据(动态)
  private HomeListDetailD:Array<Object> = [
    {
      taskId:'0001',
      list:[
        {
          id:'10240001',
          name:'xiaofeng.yao',
          dynamic:'5KM,配速6.30',
          date:'2017/04/20'
        },{
          id:'10240002',
          name:'shazi.rao',
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
          name:'shazi.rao',
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
          name:'shazi.rao',
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
          name:'shazi.rao',
          data:'2017/04/25',
        }
      ]
    }
  ];

  constructor() { }
  
  // 获取首页列表
  getHomeData(){
    return this.HomeListData
  }


}
