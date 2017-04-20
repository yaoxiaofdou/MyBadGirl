import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // 主页对象
  private mybadgirl:Object = {
    isMenu:false
  };

  constructor() { }

  ngOnInit() {
    // 设置页面高度
    this.setListHeight();  
  }

  setListHeight(){
    let height = document.body.clientHeight-50;
    document.querySelector('.homelist').setAttribute('style','height:'+height+'px;overflow-y:scroll;');
    // console.log(document.body.clientHeight)
  }

  // menu 显示隐藏
  showHomeMenu(){
    this.mybadgirl['isMenu'] = !this.mybadgirl['isMenu']
  }

}
