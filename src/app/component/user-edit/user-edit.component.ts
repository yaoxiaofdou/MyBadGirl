import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { HomeListDataService } from '../../server/home-list-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  // 页面对象
  private userEdit:Object = {};

  // 提交的表单对象
  private SubmttObj:Object = {};

  // 弹窗对象
  private Girl:Object = {};

  constructor(
    private cookieService: CookieService,
    private ListService: HomeListDataService,
    private router: Router
  ) { 
    // 初始化页面对象数据
    this.userEdit = {
      zIndex:8,
      cls:[
        {
          name: '任'
        },
        {
          name: '活'
        }
      ],
      Rname:'',
      Rdetail:'',
      Rcount:[
        {
          name:'米'
        },{
          name:'RMB'
        },{
          name:'个'
        }
      ],
      Rdate:'',
      Rrule:'',
    };
    // 提交的页面数据对象
    this.SubmttObj = {
      cls: '',
      Rname: '',
      Rdetail: '',
      Rcount: '',
      Rdate: '',
      Rrule: '',
      Rcolor: '',
      Ruser: ''
    }
  }

  ngOnInit() {
    // 设置list高度
    this.setListHeight();
    // 为每一个任务生成一个随机颜色
    this.createColor();
  }

  // 控制层级，递减z-index 
  /**
   * txt : 传入当前弹窗的输入值验证
   **/
  reduceZIndexFun(txt){
    if(txt == '' || txt == undefined){
      // 调用错误弹窗
      this.Girl = {
        type : 'danger',
        content : '输入不能为空',
        show : true,
      };
    }else{
      this.userEdit['zIndex'] -= 1;
    }
  }

  // 为每一个任务生成一个随机颜色
  createColor(){
    let colR = Math.floor(Math.random()*255);
    let colG = Math.floor(Math.random()*255);
    let colB = Math.floor(Math.random()*255);
    // console.log(colR+','+colG+','+colB);
    this.SubmttObj['Rcolor'] = colR+','+colG+','+colB;
  }

  // 重新生成一个随机色
  changeSubmttObjColor(){
    this.createColor();
  }

  // 创建任务提交
  submitCreateTask(){
    // 获取当前的用户
    this.SubmttObj['Ruser'] = this.cookieService.getObject('MyBadGirl_LoginUser');
    // 生成一张随机的图片
    let imgIndex = Math.floor(Math.random()*4);
    // 设置活动规则格式, 字符串 转换成 数组
    this.SubmttObj['Rrule'] = this.SubmttObj['Rrule'].split('，');
    // 提交的对象
    let Robj = {
      cls : this.SubmttObj['cls'],
      name: this.SubmttObj['Rname'],
      images: imgIndex,
      color: this.SubmttObj['Rcolor'],
      uid:  this.SubmttObj['Ruser']['Id'],
      user: this.SubmttObj['Ruser']['account'],
      target: this.SubmttObj['Rdetail'],
      rule: this.SubmttObj['Rrule'],
      count: this.SubmttObj['Rcount'],
      date: this.SubmttObj['Rdate'],
    };
    // console.log(this.SubmttObj)
    // console.log(Robj)
    // 新任务数据写入服务
    this.ListService.setWilddogTaskData(Robj);
    // 调用正确弹窗
    this.Girl = {
      type : 'success',
      content : '任务发布成功',
      show : true,
    };
    // 倒计时1秒后跳往任务首页。
    setTimeout(()=>{
      this.router.navigate(['/home']);
    },1000)
  }

  // 设置list高度
  setListHeight(){
    let height = document.body.clientHeight-52;
    // LDetails__list
    document.querySelector('.userEdit__content').setAttribute('style','height:'+height+'px;overflow-y:scroll;');
    // console.log(document.body.clientHeight)
    
  }

}
