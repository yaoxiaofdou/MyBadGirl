import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { HomeListDataService } from '../server/home-list-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // 主页对象
  private mybadgirl:Object = {
    isMenu:false,
    isClass:false,
    clsMenu:[],
  };

  // 设置默认分类为全部
  private homeCls:String = 'ALL';

  constructor(
    private http:Http,
    private homeData:HomeListDataService
  ) { }

  ngOnInit() {
    // 设置list高度
    this.setListHeight();
    this.getHitokotoFun();
    // 从服务get分类数据
    this.getClassData();
  }
  // 设置list高度
  setListHeight(){
    let height = document.body.clientHeight-50;
    document.querySelector('.homelist').setAttribute('style','height:'+height+'px;overflow-y:scroll;');
    // console.log(document.body.clientHeight)
  }

  // 从服务get分类数据
  getClassData(){
    this.mybadgirl['clsMenu'] = this.homeData.getHomeClsData();
  }

  // 设置分类选中
  setClsIsActive(obj){
    this.mybadgirl['clsMenu'].forEach((item,index)=>{
      item['isActive'] = false;
    });
    obj['isActive'] = true;

    //  分类传递给列表
    this.homeCls = obj['name'];
    //  关闭分类框
    this.mybadgirl['isClass'] = false;
  }

  // menu 显示隐藏
  showHomeMenu(){
    this.mybadgirl['isMenu'] = !this.mybadgirl['isMenu']
  }

  // get Hitokoto/ヒトコト
  getHitokotoFun(){
    var url = 'https://api.imjad.cn/cloudmusic/?type=detail&id=186137';
    
    this.http.get(url)
            .toPromise()
            // 成功调用
            .then((data) => {console.log(data.json())})

  }

}
