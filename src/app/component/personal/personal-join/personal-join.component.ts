import { Component, OnInit } from '@angular/core';
import { HomeListDataService } from '../../../server/home-list-data.service';

@Component({
  selector: 'app-personal-join',
  templateUrl: './personal-join.component.html',
  styleUrls: ['./personal-join.component.scss']
})
export class PersonalJoinComponent implements OnInit {

  // 进行中的列表数据
  private dataList:Array<Object>;

  constructor(
    private listDataService:HomeListDataService
  ) { 
    // 进行中的列表数据(从服务中获取)
    this.dataList = this.listDataService.getHomeData();
    console.log(this.dataList)

  }

  ngOnInit() {
  }

}
