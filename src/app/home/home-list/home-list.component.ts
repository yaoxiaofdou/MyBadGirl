import { Component, OnInit, Input } from '@angular/core';
import { HomeListDataService } from '../../server/home-list-data.service';
import { Router }from'@angular/router';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {

  // 定义接收的分类
  @Input() HomeCls;

  // 接收 list 数据
  private listData:Array<Object>;

  constructor(
    private listServerData:HomeListDataService,
    private router:Router
  ) { }

  ngOnInit() {
    // 获取服务列表数据
    this.getListServerData();
  }
  
  // 当从主页传递过来的分类有变化时调用
  ngOnChanges(){
    // console.log('list',this.HomeCls)
  }

  // 获取服务列表数据
  getListServerData(){
    this.listData = this.listServerData.getHomeData();
  }

  // 跳转详情页
  hrefDetailsFun(li){
    this.router.navigate(['/detail',li['id']]);
  }

}
