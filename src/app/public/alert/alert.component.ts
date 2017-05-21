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
import { Component, OnInit, Input, Output, OnDestroy ,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit,OnDestroy {

  @Input() Girl:Object;
  // @Output() provinceOut = new EventEmitter();

  // 返回的弹窗状态
  public province:Boolean;

  // 弹窗对象
  // public alert:Object = {};

  // 定时器
  private timer;

  constructor() {
    // 弹窗对象
    // this.alert = {
    //   type:'',           // type         (类型,success,info,danger,warning)
    //   dismissible:'',    // dismissible  (布尔值，是否显示关闭'X')
    //   time:'',           // time         (定时开关，多久后关闭弹窗)
    //   title:'',          // title        (弹窗标题)
    //   content:'',        // content      (弹窗内容)
    // }
  }

  ngOnInit() {
    // 定时关闭弹窗
    this.closeTimer(this.timer);
  }

  // 销毁组件时清除定时器
  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
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
    }, 5000);
  }

}
