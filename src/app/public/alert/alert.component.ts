/*
*  xiaofeng.yao
*  alert component
*  弹窗组件调用方法
*  
*  html : <app-alert [(Girl)]="Girl"></app-alert>
*  ts :   
*      public Girl:Object = {}; // 弹窗类型对象初始化
*     // 调用弹窗
      this.Girl = {
        type : 'danger',                   // 三种类型的框  success danger warning
        content : '账号密码错误,请重新输入',   // 弹窗的提示内容
        show : true,                       // 控制弹窗的显示与隐藏
      };
*  
*/
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() Girl:Object;
  // @Output() provinceOut = new EventEmitter();

  // 返回的弹窗状态
  public province:Boolean;

  // 弹窗对象
  public alert:Object = {};

  // 定时器
  private timer;

  constructor() {
    // 弹窗对象 
    // type         (类型,success,info,danger,warning)
    // dismissible  (布尔值，是否显示关闭'X')
    // time         (定时开关，多久后关闭弹窗)
    // title        (弹窗标题)
    // content      (弹窗内容)
    this.alert = {
      type:'',
      dismissible:'',
      time:'',
      title:'',
      content:'',
    }
  }

  ngOnInit() {
    // 定时关闭弹窗
    // this.closeTimer(this.timer);
  }

  // 手动关闭弹窗
  public closeAlert(){
    //this.provinceOut.emit();
    this.Girl['show'] = false;
  }

  // 定时关闭弹窗
  public closeTimer(timer){
    // 清除原来的定时器
    clearInterval(timer);
    // 设置的定时器
    this.timer = setInterval(() => {
      //this.provinceOut.emit();
      this.Girl['show'] = false;
    }, 3000);
  }

}
